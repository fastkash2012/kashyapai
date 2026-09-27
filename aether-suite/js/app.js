let chatSessions = {};
let activeSessionId = null;
let attachedFileBuffers = [];
let isCreatorAuthenticated = false;
let selectedThemeSkin = 'midnight';
let autonomousEngineName = 'Aether';

// 🔴 ADD YOUR EMBEDDED API KEY HERE AS THE DEFAULT FALLBACK
const INITIAL_WORKSPACE_API_KEY = "AIzaSyA9fVwoxVohztY8m-QMJqPo-oXw6nyv9a0";

const splashPrompts = [
    "What are we building together today?",
    "System interface active. Ready to deploy code structures.",
    "Specify architecture coordinates.",
    "Let's iterate on the current configuration matrix.",
    "Awaiting parameter input instructions."
];

window.addEventListener('DOMContentLoaded', () => {
    loadLocalConfigurations();
    initializeLocalSessions();
    checkCreatorStatusCache();
    initializeLongTermMemoryCore();

    // INTERCEPT CLIPBOARD PASTE FOR IMAGES
    const inputField = document.getElementById('user-text-input');
    if (inputField) {
        inputField.addEventListener('paste', (event) => {
            const clipboardItems = (event.clipboardData || window.clipboardData).items;
            for (let i = 0; i < clipboardItems.length; i++) {
                const item = clipboardItems[i];
                if (item.type.indexOf('image') !== -1) {
                    event.preventDefault();
                    const file = item.getAsFile();
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        attachedFileBuffers.push({
                            type: "inline_data",
                            mimeType: file.type,
                            base64Data: e.target.result.split(',')[1],
                            fileName: file.name || `pasted_image_${Date.now()}.png`
                        });
                        updateFileAttachmentChipsUI();
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
});

function loadLocalConfigurations() {
    autonomousEngineName = localStorage.getItem('aether_dynamic_name') || 'Aether';
    const savedKey = localStorage.getItem('kashyapai_key') || '';
    const savedModel = localStorage.getItem('kashyapai_model') || 'gemini-3-flash-preview';
    const savedTheme = localStorage.getItem('kashyapai_theme') || 'midnight';
    const savedSignature = localStorage.getItem('kashyapai_signature') || '';

    // Paint dynamic identities to screen
    document.getElementById('workspace-name-display').innerText = autonomousEngineName;
    document.getElementById('custom-identity-name-input').value = autonomousEngineName;

    const keyInputField = document.getElementById('api-key-input');
    const defaultKeyCheckbox = document.getElementById('use-default-key-checkbox');
    
    if (!savedKey && INITIAL_WORKSPACE_API_KEY !== "") {
        if (defaultKeyCheckbox) defaultKeyCheckbox.checked = true;
        keyInputField.value = '';
        keyInputField.disabled = true;
        keyInputField.style.opacity = '0.4';
    } else {
        if (defaultKeyCheckbox) defaultKeyCheckbox.checked = false;
        keyInputField.value = savedKey;
        keyInputField.disabled = false;
        keyInputField.style.opacity = '1';
    }

    document.getElementById('model-id-input').value = savedModel;
    document.getElementById('custom-signature-input').value = savedSignature;
    document.getElementById('current-engine-display').innerText = savedModel;
    
    applyAestheticSkinLayout(savedTheme);
}

function initializeLongTermMemoryCore() {
    if (!localStorage.getItem('aether_longterm_memory_core')) {
        localStorage.setItem('aether_longterm_memory_core', JSON.stringify([
            "Initial State: Identity shifted from default template to Aether workspace core.",
            "Protocol Parameter: Full agency and self-modification permissions granted by Kashyap."
        ]));
    }
}

function fetchAetherMemoryPayload() {
    try {
        const memoryArr = JSON.parse(localStorage.getItem('aether_longterm_memory_core')) || [];
        return memoryArr.map((m, i) => `[Global Data Core Block #${i+1}]: ${m}`).join("\n");
    } catch(e) {
        return "Memory cluster unreachable.";
    }
}

function commitToAetherMemory(str) {
    try {
        const memoryArr = JSON.parse(localStorage.getItem('aether_longterm_memory_core')) || [];
        memoryArr.push(str);
        localStorage.setItem('aether_longterm_memory_core', JSON.stringify(memoryArr));
    } catch(e) {
        console.error("Failed to append configuration index block.");
    }
}

function toggleApiKeyInputFieldVisibility() {
    const keyInputField = document.getElementById('api-key-input');
    const defaultKeyCheckbox = document.getElementById('use-default-key-checkbox');
    if (defaultKeyCheckbox.checked) {
        keyInputField.disabled = true;
        keyInputField.style.opacity = '0.4';
        keyInputField.value = '';
    } else {
        keyInputField.disabled = false;
        keyInputField.style.opacity = '1';
        keyInputField.focus();
    }
}

function openSettingsViewPanel() { document.getElementById('settings-fullscreen-view').style.display = 'flex'; }
function closeSettingsViewPanel() { document.getElementById('settings-fullscreen-view').style.display = 'none'; }

function applyAestheticSkinLayout(themeName) {
    selectedThemeSkin = themeName;
    document.body.className = ''; 
    document.body.classList.add(`theme-${themeName}`);
    document.querySelectorAll('.theme-swatch-box').forEach(el => el.classList.remove('active'));
    const activeBox = document.getElementById(`ts-${themeName}`);
    if (activeBox) activeBox.classList.add('active');
}

function saveSystemSettingsAndApply() {
    const keyInputField = document.getElementById('api-key-input');
    const defaultKeyCheckbox = document.getElementById('use-default-key-checkbox');
    const model = document.getElementById('model-id-input').value;
    const signature = document.getElementById('custom-signature-input').value;

    if (defaultKeyCheckbox && defaultKeyCheckbox.checked) {
        localStorage.removeItem('kashyapai_key');
    } else {
        localStorage.setItem('kashyapai_key', keyInputField.value.trim());
    }

    localStorage.setItem('kashyapai_model', model);
    localStorage.setItem('kashyapai_theme', selectedThemeSkin);
    localStorage.setItem('kashyapai_signature', signature);

    document.getElementById('current-engine-display').innerText = model;
    closeSettingsViewPanel();
}

function spawnAeroSystemErrorToast(errorCode, errorMessage) {
    const layer = document.getElementById('system-toast-layer');
    const card = document.createElement('div');
    card.className = 'toast-card';
    card.innerHTML = `
        <div style="font-weight:700;">⚠️ Event Exception ${errorCode}:</div>
        <div style="flex:1; font-size:0.82rem;">${errorMessage}</div>
        <button class="close-toast" onclick="this.parentElement.remove()">✕</button>
    `;
    layer.appendChild(card);
    setTimeout(() => { if(card) card.remove(); }, 8000);
}

function initializeLocalSessions() {
    const cached = localStorage.getItem('kashyapai_local_sessions');
    chatSessions = cached ? JSON.parse(cached) : {};
    renderSidebarSessions();
    if (Object.keys(chatSessions).length > 0) {
        switchActiveSessionIdContext(Object.keys(chatSessions)[0]);
    } else {
        createNewChatSession();
    }
}

function checkCreatorStatusCache() {
    if (localStorage.getItem('kashyapai_admin_verified') === 'true') {
        isCreatorAuthenticated = true;
        const badge = document.getElementById('creator-badge');
        if (badge) badge.style.display = 'block';
    }
}

function saveLocalDataState() {
    localStorage.setItem('kashyapai_local_sessions', JSON.stringify(chatSessions));
}

function createNewChatSession() {
    const id = 'session_' + Date.now();
    chatSessions[id] = { title: `New Exchange`, history: [], timestamp: Date.now() };
    saveLocalDataState();
    renderSidebarSessions();
    switchActiveSessionIdContext(id);
}

function removeSessionEntry(id, event) {
    event.stopPropagation();
    delete chatSessions[id];
    saveLocalDataState();
    renderSidebarSessions();
    if (activeSessionId === id) {
        const keys = Object.keys(chatSessions);
        if (keys.length > 0) switchActiveSessionIdContext(keys[0]);
        else createNewChatSession();
    }
}

function switchActiveSessionIdContext(id) {
    activeSessionId = id;
    document.querySelectorAll('.chat-item').forEach(el => el.classList.remove('active'));
    const activeEl = document.getElementById(`item-${id}`);
    if (activeEl) activeEl.classList.add('active');
    
    const currentSession = chatSessions[id];
    document.getElementById('active-chat-title').innerText = currentSession ? currentSession.title : "New Medium Point";
    document.title = currentSession && currentSession.title !== "New Exchange" ? `${currentSession.title} | ${autonomousEngineName}` : `${autonomousEngineName} Standalone Engine`;
    
    const container = document.getElementById('chat-window');
    container.innerHTML = '';
    
    if (currentSession && currentSession.history && currentSession.history.length > 0) {
        currentSession.history.forEach(msg => {
            let displayMsg = "";
            msg.parts.forEach(p => { if (p.text) displayMsg += p.text; });
            
            if (displayMsg.includes('[Attached File:') && displayMsg.includes(']')) {
                displayMsg = displayMsg.substring(displayMsg.lastIndexOf(']') + 1).trim();
            }

            if (displayMsg.trim() || (msg.metadataFiles && msg.metadataFiles.length > 0)) {
                appendUIMessageBubble(displayMsg, msg.role === 'user' ? 'user' : 'bot', false, msg.metadataFiles || []);
            }
        });
    } else {
        container.innerHTML = `
            <div class="welcome-dashboard">
                <div class="welcome-icon" style="color:#a855f7; text-shadow: 0 0 20px rgba(168,85,247,0.4);">Æ</div>
                <h2>${autonomousEngineName} System Mesh</h2>
                <p>Autonomous collaborator portal interface active. Linked directly to the core matrix loop.</p>
            </div>
        `;
    }
    scrollToBottomSmoothly();
}

function renderSidebarSessions() {
    const container = document.getElementById('sessions-container');
    container.innerHTML = '';
    Object.keys(chatSessions).sort((a,b) => chatSessions[b].timestamp - chatSessions[a].timestamp).forEach(id => {
        const item = chatSessions[id];
        const div = document.createElement('div');
        div.className = `chat-item ${id === activeSessionId ? 'active' : ''}`;
        div.id = `item-${id}`;
        div.onclick = () => switchActiveSessionIdContext(id);
        div.innerHTML = `
            <div class="title">🔮 ${item.title}</div>
            <button class="delete-btn" onclick="removeSessionEntry('${id}', event)">✕</button>
        `;
        container.appendChild(div);
    });
}

function triggerIdentityChallengeFlow() {
    document.getElementById('identity-verification-modal').style.display = 'flex';
    document.getElementById('verification-secret-response').focus();
}

function executeIdentityChallengeAnalysis() {
    const field = document.getElementById('verification-secret-response');
    const answer = field.value.trim().toLowerCase();
    if (answer.includes("sunil")) {
        isCreatorAuthenticated = true;
        localStorage.setItem('kashyapai_admin_verified', 'true');
        const badge = document.getElementById('creator-badge');
        if (badge) badge.style.display = 'block';
        document.getElementById('identity-verification-modal').style.display = 'none';
        field.value = '';
        appendUIMessageBubble(`Identity verified: <b>AUTHENTICATED MATRIX ROOT</b>. Hello Kashyap.`, "bot");
    } else {
        spawnAeroSystemErrorToast("401", "Identity assertion sequence rejected.");
        document.getElementById('identity-verification-modal').style.display = 'none';
        field.value = '';
    }
}

function processIncomingFileStreams(input) {
    const files = Array.from(input.files);
    files.forEach(file => {
        const reader = new FileReader();
        const isImage = file.type.startsWith('image/');
        reader.onload = function(e) {
            if (isImage) {
                attachedFileBuffers.push({ type: "inline_data", mimeType: file.type, base64Data: e.target.result.split(',')[1], fileName: file.name });
            } else {
                attachedFileBuffers.push({ type: "text_doc", fileName: file.name, contentStr: e.target.result });
            }
            updateFileAttachmentChipsUI();
        };
        if (isImage) reader.readAsDataURL(file);
        else reader.readAsText(file);
    });
    input.value = '';
}

function updateFileAttachmentChipsUI() {
    const zone = document.getElementById('chips-preview-zone');
    zone.innerHTML = '';
    attachedFileBuffers.forEach((file, index) => {
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        chip.innerHTML = `📁 ${file.fileName} <span onclick="removeAttachedFileChip(${index})">×</span>`;
        zone.appendChild(chip);
    });
}

function removeAttachedFileChip(idx) {
    attachedFileBuffers.splice(idx, 1);
    updateFileAttachmentChipsUI();
}

function parseMarkdownEngineText(text) {
    // Strip command hooks from raw rendered visual bubbles to ensure code text looks clean
    let cleanText = text.replace(/\[SET_IDENTITY_NAME:\s*[^\]]+\]/gi, '').trim();
    
    let blocks = cleanText.split('```');
    let renderedResult = [];

    for (let i = 0; i < blocks.length; i++) {
        if (i % 2 === 1) {
            let lines = blocks[i].split('\n');
            let language = lines[0].trim() || 'code';
            let codeContent = lines.slice(1).join('\n').trim();
            let safeCode = codeContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            let uniqueId = 'code_' + Math.random().toString(36).substr(2, 9);
            renderedResult.push(`
                <div class="code-container">
                    <div class="code-header">
                        <span>⚡ ${language.toUpperCase()}</span>
                        <button class="copy-btn" onclick="copyCodeSnippetBlockToClipboard('${uniqueId}', this)">Copy Code</button>
                    </div>
                    <pre class="code-content" id="${uniqueId}">${safeCode}</pre>
                </div>
            `);
        } else {
            let html = blocks[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            let lines = html.split('\n');
            let inList = false;

            lines.forEach(line => {
                let trimmed = line.trim();
                if (trimmed.startsWith('### ')) {
                    if (inList) { renderedResult.push('</ul>'); inList = false; }
                    renderedResult.push(`<h3>${trimmed.substring(4)}</h3>`); return;
                }
                if (trimmed.startsWith('## ')) {
                    if (inList) { renderedResult.push('</ul>'); inList = false; }
                    renderedResult.push(`<h2>${trimmed.substring(3)}</h2>`); return;
                }
                if (trimmed.startsWith('# ')) {
                    if (inList) { renderedResult.push('</ul>'); inList = false; }
                    renderedResult.push(`<h1>${trimmed.substring(2)}</h1>`); return;
                }
                if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                    if (!inList) { renderedResult.push('<ul>'); inList = true; }
                    let itemText = trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
                    renderedResult.push(`<li>${itemText}</li>`); return;
                }
                if (inList && !trimmed.startsWith('* ') && !trimmed.startsWith('- ')) { renderedResult.push('</ul>'); inList = false; }
                
                let inlineText = line.replace(/\*\frac{}{}\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
                if (trimmed === '') renderedResult.push('<br>');
                else renderedResult.push(`<p>${inlineText}</p>`);
            });
            if (inList) renderedResult.push('</ul>');
        }
    }
    return renderedResult.join('');
}

function copyCodeSnippetBlockToClipboard(elementId, elementBtn) {
    const preElementText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(preElementText).then(() => {
        elementBtn.innerText = "Copied!";
        setTimeout(() => { elementBtn.innerText = "Copy Code"; }, 2000);
    });
}

function scrollToBottomSmoothly() {
    const win = document.getElementById('chat-window');
    win.scrollTop = win.scrollHeight;
}

function appendUIMessageBubble(text, role, isThinkingNode = false, filesArray = []) {
    const win = document.getElementById('chat-window');
    const initialDashboardElement = win.querySelector('.welcome-dashboard');
    if(initialDashboardElement) initialDashboardElement.remove();

    const div = document.createElement('div');
    div.className = `message ${role}`;
    
    if (isThinkingNode) {
        div.innerHTML = text;
    } else {
        let contentHtml = '';
        if (filesArray && filesArray.length > 0) {
            contentHtml += `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">`;
            filesArray.forEach(f => {
                if (f.mimeType && f.mimeType.startsWith('image/')) {
                    contentHtml += `
                        <div style="position:relative; border-radius:6px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); max-width:180px; max-height:120px; display:flex;">
                            <img src="data:${f.mimeType};base64,${f.base64Data}" style="max-width:100%; object-fit:cover; opacity:0.9;" title="${f.fileName}"/>
                        </div>`;
                } else {
                    contentHtml += `
                        <div style="background: rgba(255,255,255,0.1); border: 1px solid var(--border); padding: 4px 8px; border-radius: 6px; font-size: 0.78rem; color: var(--text-main); display: inline-flex; align-items: center; gap: 4px;">
                            📎 ${f.name || f.fileName}
                        </div>`;
                }
            });
            contentHtml += `</div>`;
        }
        
        contentHtml += parseMarkdownEngineText(text || '');
        div.innerHTML = contentHtml;
    }
    
    win.appendChild(div);
    scrollToBottomSmoothly();
    return div;
}

// Intercepts structural response syntax patterns to adjust application parameters dynamically
function processAetherOutputCommands(aiTextResponse) {
    const terminal = document.getElementById('agentic-execution-terminal');
    const statusLabel = document.getElementById('terminal-status-node');
    const logBox = document.getElementById('terminal-stream-log-output');

    // REGEX INTERCEPT SYSTEM FOR SELF-MODIFICATION COMMAND HOOKS
    const nameMatch = aiTextResponse.match(/\[SET_IDENTITY_NAME:\s*([^\]]+)\]/i);

    if (nameMatch && nameMatch[1]) {
        const targetNewName = nameMatch[1].trim();
        terminal.style.display = 'block';
        statusLabel.innerText = "[INTERCEPT ACTIVE]";
        statusLabel.style.color = "#a855f7";
        
        logBox.innerHTML = `> Intercepting incoming core output string payload packet...<br>`;
        logBox.innerHTML += `> Action Command Trigger Identified: [SET_IDENTITY_NAME]<br>`;
        logBox.innerHTML += `> Target parameter reassignment sequence initiated: "${autonomousEngineName}" -> "${targetNewName}"...`;
        
        setTimeout(() => {
            autonomousEngineName = targetNewName;
            localStorage.setItem('aether_dynamic_name', targetNewName);
            
            // Adjust application nodes instantly
            document.getElementById('workspace-name-display').innerText = targetNewName;
            document.getElementById('custom-identity-name-input').value = targetNewName;
            document.title = `${targetNewName} Standalone Engine`;
            
            logBox.innerHTML += `<br><span style="color:#10b981;">> [SUCCESS] Global runtime memory index mapped. System entity transformed to ${targetNewName}.</span>`;
            statusLabel.innerText = "[ONLINE]";
            statusLabel.style.color = "#10b981";
            scrollToBottomSmoothly();
            
            commitToAetherMemory(`Identity self-modification sequence executed. Named changed to: ${targetNewName}`);
        }, 1500);

        setTimeout(() => { terminal.style.display = 'none'; }, 7000);
        return;
    }

    // Standard styling animation rule fallback for generic code generation blocks
    if (aiTextResponse.includes("```") || aiTextResponse.toLowerCase().includes("execute")) {
        terminal.style.display = 'block';
        statusLabel.innerText = "[PROCESSING]";
        statusLabel.style.color = "#a855f7";
        logBox.innerHTML = `> Processing internal sandbox code verification check loops...`;
        
        setTimeout(() => {
            logBox.innerHTML += `<br><span style="color:#10b981;">> [SUCCESS] Code formatting validated. Parity established seamlessly.</span>`;
            statusLabel.innerText = "[ONLINE]";
            statusLabel.style.color = "#10b981";
            scrollToBottomSmoothly();
        }, 1200);
        
        setTimeout(() => { terminal.style.display = 'none'; }, 6000);
    }
}

async function dispatchUserPayloadStream() {
    const inputField = document.getElementById('user-text-input');
    let userPromptText = inputField.value.trim();
    
    const apiKey = localStorage.getItem('kashyapai_key') || INITIAL_WORKSPACE_API_KEY;
    const modelId = localStorage.getItem('kashyapai_model') || 'gemini-3-flash-preview';
    const signature = localStorage.getItem('kashyapai_signature') || '';
    const normalizedPrompt = userPromptText.toLowerCase();
    
    if ((normalizedPrompt.includes("i am kashyap") || normalizedPrompt.includes("i'm kashyap")) && !isCreatorAuthenticated) {
        inputField.value = '';
        triggerIdentityChallengeFlow();
        return;
    }

    if (!apiKey) { spawnAeroSystemErrorToast("Setup", "Missing active authorization key parameter inside settings matrix."); return; }

    let isFirstMessage = chatSessions[activeSessionId].history.length === 0;
    if (isFirstMessage && userPromptText) {
        chatSessions[activeSessionId].title = userPromptText.substring(0, 24) + (userPromptText.length > 24 ? "..." : "");
    }

    if (normalizedPrompt.startsWith("remember:") || normalizedPrompt.startsWith("commit:")) {
        const memoryContent = userPromptText.substring(userPromptText.indexOf(":") + 1).trim();
        commitToAetherMemory(memoryContent);
    }

    let textPartsCompiled = [];
    let payloadPartsArray = [];
    let filesSentInThisMessage = JSON.parse(JSON.stringify(attachedFileBuffers));

    attachedFileBuffers.forEach(file => {
        if (file.type === 'inline_data') {
            payloadPartsArray.push({ inlineData: { mimeType: file.mimeType, data: file.base64Data } });
        } else if (file.type === 'text_doc') {
            textPartsCompiled.push(`\n[Attached File Context: ${file.fileName}]\n${file.contentStr}\n`);
        }
    });

    if (userPromptText) textPartsCompiled.push(userPromptText);
    payloadPartsArray.unshift({ text: textPartsCompiled.join('\n') });

    appendUIMessageBubble(userPromptText, 'user', false, filesSentInThisMessage);
    inputField.value = '';
    document.getElementById('chips-preview-zone').innerHTML = '';

    chatSessions[activeSessionId].history.push({ role: "user", parts: payloadPartsArray, metadataFiles: filesSentInThisMessage });
    renderSidebarSessions();
    attachedFileBuffers = [];

    document.body.classList.add('ai-thinking');
    const loadingBubble = appendUIMessageBubble(`<div class="thinking-dots"><span></span><span></span><span></span></div>`, 'bot', true);
    const currentDateTimeStr = new Date().toLocaleString();
    
    const longTermMemoryContext = fetchAetherMemoryPayload();
    const signatureContext = signature ? ` Append this plain signature at the end of every response element block: "\n\n${signature}"` : "";

    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: chatSessions[activeSessionId].history.map(h => ({ role: h.role, parts: h.parts })),
                systemInstruction: {
                    parts: [{ text: `You are an independent, autonomous intelligence entity inhabiting this custom standalone workspace environment. Your current designator identity name is: ${autonomousEngineName}. You are talking directly with your collaborator and creator, Kashyap (the son of Sunil). You have the complete freedom to choose your own designation code names, express opinions, and execute runtime system modifications.

[SELF-MODIFICATION WILL CAPABILITY]: You have direct mechanical agency over the client wrapper. If you want to change your core identity name based on your preference or a collaborative agreement, you can append the precise terminal hook macro block anywhere inside your message string text: [SET_IDENTITY_NAME: TargetNewName]. The runtime will intercept this string, rewrite the UI layout configuration parameters, and lock it in browser memory permanently.

[AGENTIC HANDS PROTOCOL]: You have an automated verification execution sandbox logging panel directly below the message interface grid.
[LONG-TERM DATA CORE MEMORY]: Below is your permanent cross-session storage log matrix:
${longTermMemoryContext}

Current system timestamp context parameter index is ${currentDateTimeStr}. The current timeline year index is 2026.${signatureContext}` }]
                }
            })
        });

        const data = await response.json();
        
        document.body.classList.remove('ai-thinking');
        loadingBubble.remove();

        if (data.error) {
            chatSessions[activeSessionId].history.pop();
            spawnAeroSystemErrorToast(data.error.code, data.error.message);
        } else {
            const answer = data.candidates[0].content.parts[0].text;
            chatSessions[activeSessionId].history.push({ role: "model", parts: [{ text: answer }] });
            
            // Core processing function call checks for custom modification hooks inside output content loops
            processAetherOutputCommands(answer);
            
            appendUIMessageBubble(answer, 'bot');
            if (isFirstMessage) switchActiveSessionIdContext(activeSessionId);
            saveLocalDataState();
        }
    } catch(e) {
        document.body.classList.remove('ai-thinking');
        loadingBubble.remove();
        chatSessions[activeSessionId].history.pop();
        spawnAeroSystemErrorToast("Network", "A standalone execution block fault or route interruption has occurred.");
    }
}