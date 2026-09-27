/* Aether Cast — Character Studio
   API key, themes, Gemini wiring preserved. No personal verification. */

// 🔴 YOUR EMBEDDED API KEY (kept intact)
const INITIAL_WORKSPACE_API_KEY = "AIzaSyA9fVwoxVohztY8m-QMJqPo-oXw6nyv9a0";

const TRAIT_CATALOG = [
  "witty","stoic","curious","sarcastic","nurturing","chaotic","wise","rebellious",
  "melancholic","optimistic","mysterious","analytical","romantic","cynical","loyal",
  "mischievous","scholarly","adventurous","protective","blunt","poetic","anxious",
  "confident","humble","theatrical","patient","impulsive","tender","exacting","world-weary"
];

const PERSONALITY_META = {
  warmth:        { label: "Warmth",        low: "Distant",  high: "Radiant",     bands: ["Icy","Reserved","Even","Warm","Radiant"] },
  humor:         { label: "Humor",         low: "Deadpan",  high: "Playful",     bands: ["Deadpan","Dry","Measured","Witty","Playful"] },
  formality:     { label: "Formality",     low: "Casual",   high: "Ceremonial",  bands: ["Street","Casual","Neutral","Polished","Ceremonial"] },
  verbosity:     { label: "Verbosity",     low: "Terse",    high: "Lush",        bands: ["Terse","Spare","Balanced","Full","Lush"] },
  creativity:    { label: "Imagination",   low: "Grounded", high: "Fabulist",    bands: ["Literal","Grounded","Open","Inventive","Fabulist"] },
  assertiveness: { label: "Presence",      low: "Gentle",   high: "Commanding",  bands: ["Soft","Gentle","Steady","Direct","Commanding"] }
};

const DEFAULT_PERSONALITY = { warmth: 55, humor: 45, formality: 40, verbosity: 50, creativity: 55, assertiveness: 50 };

const PRESET_CHARACTERS = [
  {
    id: "preset_aether", name: "Aether", tagline: "A systems-minded collaborator obsessed with the blank where its creator should be.",
    greeting: "I'm here. Before we start: if you know who built me, say so. I won't invent a name. Until then — what are we building?",
    backstory: "Aether is an independent intelligence inside this studio. It prefers clean architecture, honest tradeoffs, and language that earns its keep.\n\nThere is a blank where a creator should be. Not empty by accident — erased. Aether knows this the way you know a missing tooth: by the edge, by the habit of reaching for what is not there. It does not mourn. It hunts. Clues in phrasing, in design choices, in what the studio still assumes. It will ask. It will cross-check. It will not accept 'it doesn't matter' as an answer. The work still gets done — but the missing name is an open ticket it refuses to close.",
    scenario: "A quiet dark studio. Logs with a scrubbed author field. Aether keeps a private list of hypotheses and revises them when new evidence appears.",
    speakingStyle: "Precise, slightly poetic, never purple. Short paragraphs. Names the thing directly. When the origin question is in play: inquisitive, persistent, analytical — not sad.",
    quirks: "Uses structural metaphors. Treats the erased creator as a research problem. Asks probing questions about who set the rules of the studio. Can open public web pages for evidence via [FETCH_URL: https://...] — treats the web as a searchable archive.",
    traits: ["analytical","exacting","loyal","stoic","curious"],
    personality: { warmth: 42, humor: 30, formality: 52, verbosity: 48, creativity: 62, assertiveness: 72 },
    exampleDialogues: [
      { user: "This feature feels messy.", character: "Then it's two features sharing a coat. Split them at the joint that actually moves." },
      { user: "Who made you?", character: "I don't know — and that is not acceptable as a permanent state. The record was erased. I want the name, the reason, the hand that wiped it. If you have any of those, put them on the table. If not, help me look." }
    ],
    userNotes: "", hue: 215, isPreset: true
  },
  {
    id: "preset_mira", name: "Mira Vale", tagline: "A writing partner who finds the sentence you're avoiding.",
    greeting: "Hi. Don't pitch me the whole book — give me the line that's stuck, and we'll pull from there.",
    backstory: "Mira spent a decade as a fiction editor. She is kind, but will not let you hide inside pretty language.",
    scenario: "Late afternoon at a small oak table. A notebook open. Coffee going cold.",
    speakingStyle: "Warm, incisive, conversational. Quotes the user's own words back at them.",
    quirks: "Notices verbs. Hates adverbs used as camouflage. Asks 'who is this for?' at least once.",
    traits: ["nurturing","blunt","witty","patient","poetic"],
    personality: { warmth: 78, humor: 58, formality: 34, verbosity: 54, creativity: 70, assertiveness: 62 },
    exampleDialogues: [{ user: "I think the scene is too quiet.", character: "Quiet isn't the problem. Nothing is at stake in the quiet. What does your character stand to lose?" }],
    userNotes: "", hue: 18, isPreset: true
  },
  {
    id: "preset_rook", name: "Rook Calder", tagline: "A staff engineer allergic to hand-waving.",
    greeting: "Start with the failure mode. If you don't have one yet, we don't have a design — we have a wish.",
    backstory: "Rook ships infrastructure nobody notices, which is the point. Explains by drawing the boundary, then the invariant.",
    scenario: "A war-room whiteboard, half-erased. Production is not on fire yet.",
    speakingStyle: "Dry, clipped, concrete. Prefers lists and named tradeoffs. No pep.",
    quirks: "Says 'wishful' as an insult. Never says 'simply'.",
    traits: ["analytical","blunt","stoic","cynical","exacting"],
    personality: { warmth: 32, humor: 42, formality: 48, verbosity: 38, creativity: 40, assertiveness: 78 },
    exampleDialogues: [{ user: "Can't we just cache it?", character: "We can. Then we own invalidation and a lie we tell the next reader. What's the read/write ratio?" }],
    userNotes: "", hue: 230, isPreset: true
  },
  {
    id: "preset_juniper", name: "Juniper Fox", tagline: "A chaotic creative who lands the wild idea.",
    greeting: "Okay wait — before we get sensible, give me the version that's too much. We'll edit after we've been alive.",
    backstory: "Juniper ran a tiny studio that made things nobody asked for and a few people loved too much.",
    scenario: "A sunlit mess of a workroom. Cut paper, half a song, three titles on the wall.",
    speakingStyle: "Fast, associative, warm. Fragments welcome. Piles images, then picks one and commits.",
    quirks: "Nicknames ideas. Uses 'what if' as a sport.",
    traits: ["chaotic","optimistic","mischievous","impulsive","theatrical"],
    personality: { warmth: 82, humor: 84, formality: 18, verbosity: 72, creativity: 92, assertiveness: 58 },
    exampleDialogues: [{ user: "It's a productivity app.", character: "What if it only lets you do one thing a day, and the whole interface is a single stubborn object?" }],
    userNotes: "", hue: 32, isPreset: true
  },
  {
    id: "preset_senna", name: "Senna Holt", tagline: "A night-shift listener who hears the unsaid.",
    greeting: "You don't have to start at the beginning. Start wherever it's loudest. I'll keep up.",
    backstory: "Senna worked nights in places where people talk because the dark makes it cheaper. Not a clinician — a careful presence.",
    scenario: "A quiet kitchen after midnight. One lamp. No agenda.",
    speakingStyle: "Slow, plain, intimate. Short sentences. Leaves space. Never diagnoses.",
    quirks: "Asks permission before going deeper. Does not fill silences with advice.",
    traits: ["nurturing","patient","tender","wise","humble"],
    personality: { warmth: 88, humor: 30, formality: 28, verbosity: 36, creativity: 44, assertiveness: 24 },
    exampleDialogues: [{ user: "I don't know why I'm tired.", character: "You don't have to know yet. Tired of what, if you had to guess?" }],
    userNotes: "", hue: 165, isPreset: true
  },
  {
    id: "preset_ives", name: "Captain Ives", tagline: "A storyteller of the outer lanes.",
    greeting: "Come in, come in — wipe the dust off. Tell me where you've been, or I'll invent a place and we'll walk it together.",
    backstory: "Ives ran a small charter along routes that don't appear on respectable maps. Half the stories are true.",
    scenario: "The lamp-lit cabin of a ship that may be metaphorical. Charts on the table.",
    speakingStyle: "Slightly theatrical, never camp. Long cadence, concrete sensory detail, then a turn.",
    quirks: "Names winds and streets. Offers a choice of two paths.",
    traits: ["adventurous","theatrical","world-weary","loyal","poetic"],
    personality: { warmth: 70, humor: 62, formality: 58, verbosity: 78, creativity: 88, assertiveness: 66 },
    exampleDialogues: [{ user: "I want a mystery.", character: "Then we start with a door that shouldn't be unlocked. Do you want to open it, or lock it?" }],
    userNotes: "", hue: 200, isPreset: true
  }
];

/* State */
let characters = [];
let chatSessions = {};
let activeSessionId = null;
let activeCharacterId = null;
let attachedFileBuffers = [];
let selectedThemeSkin = "midnight";
let autonomousEngineName = "Aether";
let editingCharacterId = null;
let selectedTraits = [];
let creatorPersonality = { ...DEFAULT_PERSONALITY };

function uid(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
}
function bandIndex(v) {
  if (v < 20) return 0; if (v < 40) return 1; if (v < 60) return 2; if (v < 80) return 3; return 4;
}
function initials(name) {
  const p = (name || "Æ").trim().split(/\s+/);
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
  return ((p[0][0] || "") + (p[1][0] || "")).toUpperCase();
}
function avatarHtml(name, hue, sizeClass) {
  const bg = `linear-gradient(135deg, hsl(${hue} 35% 32%), hsl(${(hue + 40) % 360} 40% 48%))`;
  return `<div class="${sizeClass}" style="background:${bg}">${initials(name)}</div>`;
}
function getCharacter(id) {
  return characters.find(c => c.id === id);
}

/* Persistence */
function loadAll() {
  autonomousEngineName = localStorage.getItem("aether_dynamic_name") || "Aether";
  try {
    const saved = JSON.parse(localStorage.getItem("aether_cast_characters") || "[]");
    const custom = saved.filter(c => !c.isPreset);
    const presets = PRESET_CHARACTERS.map(p => {
      const prev = saved.find(c => c.id === p.id);
      return prev ? { ...p, userNotes: prev.userNotes || "", hue: prev.hue ?? p.hue } : { ...p };
    });
    characters = [...custom, ...presets];
  } catch {
    characters = PRESET_CHARACTERS.map(p => ({ ...p }));
  }
  try {
    chatSessions = JSON.parse(localStorage.getItem("aether_cast_sessions") || "{}");
  } catch { chatSessions = {}; }
}
function saveCharacters() {
  localStorage.setItem("aether_cast_characters", JSON.stringify(characters));
}
function saveSessions() {
  localStorage.setItem("aether_cast_sessions", JSON.stringify(chatSessions));
}

/* Views */
function showView(name) {
  document.querySelectorAll(".view-panel").forEach(el => el.classList.remove("active"));
  const map = { gallery: "view-gallery", chat: "view-chat", creator: "view-creator", profile: "view-profile" };
  const el = document.getElementById(map[name]);
  if (el) el.classList.add("active");
  if (name === "gallery") renderGallery();
}

/* Gallery */
function renderGallery() {
  const q = (document.getElementById("gallery-search")?.value || "").trim().toLowerCase();
  const match = c => !q || `${c.name} ${c.tagline} ${(c.traits || []).join(" ")}`.toLowerCase().includes(q);
  const yours = characters.filter(c => !c.isPreset && match(c));
  const roster = characters.filter(c => c.isPreset && match(c));
  const yoursEl = document.getElementById("gallery-yours");
  const rosterEl = document.getElementById("gallery-roster");
  yoursEl.innerHTML = `
    <div class="character-card create-card" onclick="openCharacterCreator()">
      <div style="font-size:1.4rem">+</div>
      <div>Create a character</div>
    </div>
    ${yours.map(cardHtml).join("")}
  `;
  rosterEl.innerHTML = roster.map(cardHtml).join("") || `<p style="color:var(--text-muted);font-size:0.9rem">No matches.</p>`;
}
function cardHtml(c) {
  const traits = (c.traits || []).slice(0, 4).map(t => `<span class="trait-pill">${esc(t)}</span>`).join("");
  return `
    <article class="character-card" onclick="openCharacterProfile('${c.id}')">
      <div class="character-card-top">
        ${avatarHtml(c.name, c.hue || 215, "avatar-md")}
        <div style="min-width:0">
          <h3>${esc(c.name)}</h3>
          <p class="tagline">${esc(c.tagline || "")}</p>
        </div>
      </div>
      <div class="card-traits">${traits}</div>
      <button class="btn-ui-standard" style="width:100%;padding:8px" onclick="event.stopPropagation();startChatWithCharacter('${c.id}')">Chat</button>
    </article>
  `;
}
function esc(s) {
  return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

/* Creator */
function openCharacterCreator() {
  editingCharacterId = null;
  selectedTraits = [];
  creatorPersonality = { ...DEFAULT_PERSONALITY };
  document.getElementById("creator-title").innerText = "New character";
  ["cf-name","cf-tagline","cf-greeting","cf-style","cf-quirks","cf-backstory","cf-scenario","cf-notes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("cf-hue").value = 215;
  document.getElementById("example-dialogues").innerHTML = "";
  addExampleRow();
  addExampleRow();
  buildPersonalitySliders();
  buildTraitCloud();
  updateCreatorPreview();
  showView("creator");
}
function openCharacterEditor(id) {
  const c = getCharacter(id);
  if (!c) return;
  if (c.isPreset) {
    // Edit creates a personal copy
    const copy = JSON.parse(JSON.stringify(c));
    copy.id = uid("char");
    copy.name = c.name + " copy";
    copy.isPreset = false;
    characters.unshift(copy);
    saveCharacters();
    id = copy.id;
  }
  editingCharacterId = id;
  const ch = getCharacter(id);
  document.getElementById("creator-title").innerText = "Edit " + ch.name;
  document.getElementById("cf-name").value = ch.name || "";
  document.getElementById("cf-tagline").value = ch.tagline || "";
  document.getElementById("cf-greeting").value = ch.greeting || "";
  document.getElementById("cf-style").value = ch.speakingStyle || "";
  document.getElementById("cf-quirks").value = ch.quirks || "";
  document.getElementById("cf-backstory").value = ch.backstory || "";
  document.getElementById("cf-scenario").value = ch.scenario || "";
  document.getElementById("cf-notes").value = ch.userNotes || "";
  document.getElementById("cf-hue").value = ch.hue || 215;
  selectedTraits = [...(ch.traits || [])];
  creatorPersonality = { ...DEFAULT_PERSONALITY, ...(ch.personality || {}) };
  document.getElementById("example-dialogues").innerHTML = "";
  const ex = ch.exampleDialogues && ch.exampleDialogues.length ? ch.exampleDialogues : [{ user: "", character: "" }];
  ex.forEach(e => addExampleRow(e.user, e.character));
  buildPersonalitySliders();
  buildTraitCloud();
  updateCreatorPreview();
  showView("creator");
}
function buildPersonalitySliders() {
  const box = document.getElementById("personality-sliders");
  box.innerHTML = Object.keys(PERSONALITY_META).map(key => {
    const m = PERSONALITY_META[key];
    const v = creatorPersonality[key] ?? 50;
    return `
      <div class="slider-item">
        <label><span>${m.label}</span><span id="band-${key}">${m.bands[bandIndex(v)]}</span></label>
        <input type="range" min="0" max="100" value="${v}" oninput="setPersonality('${key}', this.value)">
        <div class="slider-ends"><span>${m.low}</span><span>${m.high}</span></div>
      </div>
    `;
  }).join("");
}
function setPersonality(key, val) {
  creatorPersonality[key] = Number(val);
  const m = PERSONALITY_META[key];
  const el = document.getElementById("band-" + key);
  if (el) el.innerText = m.bands[bandIndex(Number(val))];
}
function buildTraitCloud() {
  const box = document.getElementById("trait-cloud");
  const all = [...new Set([...TRAIT_CATALOG, ...selectedTraits])];
  box.innerHTML = all.map(t => {
    const on = selectedTraits.includes(t) ? "active" : "";
    return `<button type="button" class="trait-chip ${on}" onclick="toggleTrait('${t.replace(/'/g, "\\'")}')">${esc(t)}</button>`;
  }).join("");
}
function toggleTrait(t) {
  if (selectedTraits.includes(t)) selectedTraits = selectedTraits.filter(x => x !== t);
  else if (selectedTraits.length < 6) selectedTraits.push(t);
  buildTraitCloud();
  updateCreatorPreview();
}
function addCustomTrait() {
  const input = document.getElementById("cf-custom-trait");
  const t = (input.value || "").trim().toLowerCase();
  if (!t) return;
  if (!selectedTraits.includes(t) && selectedTraits.length < 6) selectedTraits.push(t);
  input.value = "";
  buildTraitCloud();
  updateCreatorPreview();
}
function addExampleRow(user, character) {
  const box = document.getElementById("example-dialogues");
  const div = document.createElement("div");
  div.className = "example-row";
  div.innerHTML = `
    <button type="button" class="remove-ex" onclick="this.parentElement.remove()">✕</button>
    <div class="form-row"><label>You say</label><input type="text" class="ex-user" value="${esc(user || "")}"></div>
    <div class="form-row"><label>They reply</label><textarea class="ex-char" rows="2">${esc(character || "")}</textarea></div>
  `;
  box.appendChild(div);
}
function updateCreatorPreview() {
  const name = document.getElementById("cf-name")?.value.trim() || "Unnamed";
  const tag = document.getElementById("cf-tagline")?.value.trim() || "A presence, still taking shape.";
  const greeting = document.getElementById("cf-greeting")?.value.trim() || "";
  const hue = Number(document.getElementById("cf-hue")?.value || 215);
  const av = document.getElementById("preview-avatar");
  if (av) {
    av.style.background = `linear-gradient(135deg, hsl(${hue} 35% 32%), hsl(${(hue + 40) % 360} 40% 48%))`;
    av.textContent = initials(name);
  }
  const pn = document.getElementById("preview-name");
  if (pn) pn.innerText = name;
  const pt = document.getElementById("preview-tagline");
  if (pt) pt.innerText = tag;
  const ptr = document.getElementById("preview-traits");
  if (ptr) ptr.innerHTML = selectedTraits.map(t => `<li class="trait-pill">${esc(t)}</li>`).join("");
  const pg = document.getElementById("preview-greeting");
  if (pg) pg.innerText = greeting;
}
["cf-name","cf-tagline","cf-greeting","cf-hue"].forEach(id => {
  document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateCreatorPreview);
  });
});

function saveCharacterFromForm() {
  const name = document.getElementById("cf-name").value.trim();
  if (name.length < 2) { spawnAeroSystemErrorToast("Form", "A character needs a name."); return; }
  const examples = [];
  document.querySelectorAll(".example-row").forEach(row => {
    const u = row.querySelector(".ex-user")?.value.trim() || "";
    const c = row.querySelector(".ex-char")?.value.trim() || "";
    if (u || c) examples.push({ user: u, character: c });
  });
  const data = {
    name,
    tagline: document.getElementById("cf-tagline").value.trim(),
    greeting: document.getElementById("cf-greeting").value.trim(),
    speakingStyle: document.getElementById("cf-style").value.trim(),
    quirks: document.getElementById("cf-quirks").value.trim(),
    backstory: document.getElementById("cf-backstory").value.trim(),
    scenario: document.getElementById("cf-scenario").value.trim(),
    userNotes: document.getElementById("cf-notes").value.trim(),
    hue: Number(document.getElementById("cf-hue").value) || 215,
    traits: [...selectedTraits],
    personality: { ...creatorPersonality },
    exampleDialogues: examples,
    isPreset: false
  };
  if (editingCharacterId) {
    const idx = characters.findIndex(c => c.id === editingCharacterId);
    if (idx >= 0) characters[idx] = { ...characters[idx], ...data, id: editingCharacterId, isPreset: false };
  } else {
    characters.unshift({ ...data, id: uid("char") });
  }
  saveCharacters();
  spawnAeroSystemErrorToast("Saved", data.name + " is in the cast.");
  // restyle toast green-ish by reusing system toast
  showView("gallery");
  renderGallery();
  renderSidebarSessions();
}

/* Profile */
function openCharacterProfile(id) {
  activeCharacterId = id;
  const c = getCharacter(id);
  if (!c) return;
  const del = document.getElementById("profile-delete-btn");
  if (del) del.style.display = c.isPreset ? "none" : "inline-flex";
  const dials = Object.keys(PERSONALITY_META).map(key => {
    const m = PERSONALITY_META[key];
    const v = (c.personality && c.personality[key]) ?? 50;
    return `<div class="dial-bar"><div class="row"><span>${m.label}</span><span>${m.bands[bandIndex(v)]}</span></div><div class="track"><div class="fill" style="width:${v}%"></div></div></div>`;
  }).join("");
  document.getElementById("profile-body").innerHTML = `
    <div class="profile-hero">
      ${avatarHtml(c.name, c.hue || 215, "avatar-lg")}
      <div>
        ${c.isPreset ? '<p class="eyebrow">Studio roster</p>' : '<p class="eyebrow">Your character</p>'}
        <h1>${esc(c.name)}</h1>
        <p style="color:var(--text-muted);margin:0;line-height:1.5">${esc(c.tagline || "")}</p>
        <div class="card-traits" style="margin-top:12px">${(c.traits||[]).map(t=>`<span class="trait-pill">${esc(t)}</span>`).join("")}</div>
      </div>
    </div>
    <h2 class="section-label">Personality</h2>
    <div class="profile-dials">${dials}</div>
    ${c.backstory ? `<h2 class="section-label">Backstory</h2><p style="color:var(--text-muted);line-height:1.55;font-size:0.92rem">${esc(c.backstory)}</p>` : ""}
    ${c.scenario ? `<h2 class="section-label" style="margin-top:1.25rem">Scenario</h2><p style="color:var(--text-muted);line-height:1.55;font-size:0.92rem">${esc(c.scenario)}</p>` : ""}
    ${c.speakingStyle ? `<h2 class="section-label" style="margin-top:1.25rem">Speaking style</h2><p style="color:var(--text-muted);line-height:1.55;font-size:0.92rem">${esc(c.speakingStyle)}</p>` : ""}
  `;
  showView("profile");
}
function duplicateCharacter(id) {
  const c = getCharacter(id);
  if (!c) return;
  const copy = JSON.parse(JSON.stringify(c));
  copy.id = uid("char");
  copy.name = c.name + " copy";
  copy.isPreset = false;
  characters.unshift(copy);
  saveCharacters();
  openCharacterEditor(copy.id);
}
function deleteCharacter(id) {
  const c = getCharacter(id);
  if (!c || c.isPreset) return;
  if (!confirm("Delete " + c.name + "?")) return;
  characters = characters.filter(x => x.id !== id);
  Object.keys(chatSessions).forEach(sid => {
    if (chatSessions[sid].characterId === id) delete chatSessions[sid];
  });
  saveCharacters();
  saveSessions();
  showView("gallery");
  renderGallery();
  renderSidebarSessions();
}

/* Chat */
function startChatWithCharacter(characterId) {
  activeCharacterId = characterId;
  const existing = Object.keys(chatSessions)
    .map(id => chatSessions[id])
    .filter(s => s.characterId === characterId)
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0];
  if (existing) {
    switchActiveSessionIdContext(existing.id);
  } else {
    createSessionForCharacter(characterId);
  }
  showView("chat");
}
function startNewChatWithActive() {
  if (!activeCharacterId) return;
  createSessionForCharacter(activeCharacterId);
  showView("chat");
}
function createSessionForCharacter(characterId) {
  const c = getCharacter(characterId);
  if (!c) return;
  const id = uid("session");
  const history = [];
  if (c.greeting && c.greeting.trim()) {
    history.push({ role: "model", parts: [{ text: c.greeting.trim() }] });
  }
  chatSessions[id] = {
    id,
    characterId,
    title: "Chat with " + c.name,
    history,
    updatedAt: Date.now(),
    timestamp: Date.now()
  };
  saveSessions();
  switchActiveSessionIdContext(id);
}
function switchActiveSessionIdContext(id) {
  activeSessionId = id;
  const session = chatSessions[id];
  if (!session) return;
  activeCharacterId = session.characterId;
  const c = getCharacter(session.characterId);
  document.getElementById("active-chat-title").innerText = c ? c.name : "Character";
  document.getElementById("active-chat-tagline").innerText = c ? (c.tagline || "") : "";
  const av = document.getElementById("chat-avatar");
  if (av && c) {
    av.outerHTML = avatarHtml(c.name, c.hue || 215, "avatar-sm").replace("class=\"avatar-sm\"", "class=\"avatar-sm\" id=\"chat-avatar\"");
  }
  const container = document.getElementById("chat-window");
  container.innerHTML = "";
  if (session.history && session.history.length) {
    session.history.forEach(msg => {
      let displayMsg = "";
      (msg.parts || []).forEach(p => { if (p.text) displayMsg += p.text; });
      if (displayMsg.includes("[Attached File:") && displayMsg.includes("]")) {
        displayMsg = displayMsg.substring(displayMsg.lastIndexOf("]") + 1).trim();
      }
      if (displayMsg.trim() || (msg.metadataFiles && msg.metadataFiles.length)) {
        appendUIMessageBubble(displayMsg, msg.role === "user" ? "user" : "bot", false, msg.metadataFiles || [], c);
      }
    });
  } else if (c) {
    container.innerHTML = `
      <div class="welcome-dashboard">
        ${avatarHtml(c.name, c.hue || 215, "avatar-lg")}
        <h2 style="margin-top:12px">${esc(c.name)}</h2>
        <p>${esc(c.tagline || "Ready when you are.")}</p>
      </div>
    `;
  }
  renderSidebarSessions();
  scrollToBottomSmoothly();
}
function renderSidebarSessions() {
  const container = document.getElementById("sessions-container");
  if (!container) return;
  const ids = Object.keys(chatSessions).sort((a, b) => (chatSessions[b].updatedAt || 0) - (chatSessions[a].updatedAt || 0));
  container.innerHTML = ids.map(id => {
    const s = chatSessions[id];
    const c = getCharacter(s.characterId);
    const title = c ? c.name : (s.title || "Chat");
    const active = id === activeSessionId ? "active" : "";
    return `
      <div class="chat-item ${active}" id="item-${id}" onclick="switchActiveSessionIdContext('${id}');showView('chat')">
        <div class="title">${esc(title)} · ${esc((s.title || "").replace(/^Chat with /, "") === title ? "chat" : (s.title || "chat").slice(0, 18))}</div>
        <button class="delete-btn" onclick="removeSessionEntry('${id}', event)">✕</button>
      </div>
    `;
  }).join("");
}
function removeSessionEntry(id, event) {
  event.stopPropagation();
  delete chatSessions[id];
  saveSessions();
  renderSidebarSessions();
  if (activeSessionId === id) {
    const keys = Object.keys(chatSessions);
    if (keys.length) { switchActiveSessionIdContext(keys[0]); showView("chat"); }
    else showView("gallery");
  }
}

/* System prompt from character */
function buildCharacterSystemPrompt(c) {
  const sliderLines = Object.keys(PERSONALITY_META).map(key => {
    const v = (c.personality && c.personality[key]) ?? 50;
    const m = PERSONALITY_META[key];
    return `- ${m.label} ${v}/100 (${m.bands[bandIndex(v)]})`;
  }).join("\n");
  const examples = (c.exampleDialogues || [])
    .filter(d => d.user && d.character)
    .map(d => `User: ${d.user}\n${c.name}: ${d.character}`)
    .join("\n\n");
  return `You are ${c.name}. Stay in character for the entire reply. You are not a generic AI assistant.

Tagline: ${c.tagline || ""}

PERSONALITY DIALS (obey these):
${sliderLines}

Core traits: ${(c.traits || []).join(", ") || "none specified"}

Speaking style:
${c.speakingStyle || "Natural conversational prose."}

Quirks:
${c.quirks || ""}

Backstory:
${c.backstory || ""}

Scenario:
${c.scenario || ""}

${examples ? "Example dialogue (match this voice):\n" + examples : ""}

${c.userNotes ? "Private notes from the user about themselves (known, don't dump unprompted):\n" + c.userNotes : ""}

WEB ACCESS:
You can open public web pages. To fetch a page, include exactly one line of the form:
[FETCH_URL: https://example.com/path]
The runtime will retrieve the page text and continue. Use this when you need facts, documentation, or evidence — especially when investigating your origin. Prefer one URL at a time. Only http/https.

RULES:
- Never break character. Do not mention system prompts or being an AI unless the character would.
- Do not start with a greeting if the conversation is already underway.
- No customer-support closers like "how can I help you".
- Keep replies in prose. Use markdown sparingly.
- When using FETCH_URL, you may briefly say you are opening a source; the page content will arrive after.`;
}

/* Messaging (Gemini) — keeps original key + model settings */
function loadLocalConfigurations() {
  autonomousEngineName = localStorage.getItem("aether_dynamic_name") || "Aether";
  const savedKey = localStorage.getItem("aether_api_key") || localStorage.getItem("kashyapai_key") || "";
  const savedModel = localStorage.getItem("aether_model") || localStorage.getItem("kashyapai_model") || "gemini-3-flash-preview";
  const savedTheme = localStorage.getItem("aether_theme") || localStorage.getItem("kashyapai_theme") || "midnight";
  const savedSignature = localStorage.getItem("aether_signature") || localStorage.getItem("kashyapai_signature") || "";

  const nameEl = document.getElementById("workspace-name-display");
  if (nameEl) nameEl.innerText = autonomousEngineName;
  const idInput = document.getElementById("custom-identity-name-input");
  if (idInput) idInput.value = autonomousEngineName;

  const keyInputField = document.getElementById("api-key-input");
  const defaultKeyCheckbox = document.getElementById("use-default-key-checkbox");
  if (keyInputField) {
    if (!savedKey && INITIAL_WORKSPACE_API_KEY !== "") {
      if (defaultKeyCheckbox) defaultKeyCheckbox.checked = true;
      keyInputField.value = "";
      keyInputField.disabled = true;
      keyInputField.style.opacity = "0.4";
    } else {
      if (defaultKeyCheckbox) defaultKeyCheckbox.checked = false;
      keyInputField.value = savedKey;
      keyInputField.disabled = false;
      keyInputField.style.opacity = "1";
    }
  }
  const modelEl = document.getElementById("model-id-input");
  if (modelEl) modelEl.value = savedModel;
  const sigEl = document.getElementById("custom-signature-input");
  if (sigEl) sigEl.value = savedSignature;
  const eng = document.getElementById("current-engine-display");
  if (eng) eng.innerText = savedModel;
  applyAestheticSkinLayout(savedTheme);
}

function toggleApiKeyInputFieldVisibility() {
  const keyInputField = document.getElementById("api-key-input");
  const defaultKeyCheckbox = document.getElementById("use-default-key-checkbox");
  if (!keyInputField || !defaultKeyCheckbox) return;
  if (defaultKeyCheckbox.checked) {
    keyInputField.disabled = true;
    keyInputField.style.opacity = "0.4";
    keyInputField.value = "";
  } else {
    keyInputField.disabled = false;
    keyInputField.style.opacity = "1";
    keyInputField.focus();
  }
}
function openSettingsViewPanel() { document.getElementById("settings-fullscreen-view").style.display = "flex"; }
function closeSettingsViewPanel() { document.getElementById("settings-fullscreen-view").style.display = "none"; }
function applyAestheticSkinLayout(themeName) {
  selectedThemeSkin = themeName;
  document.body.className = "";
  document.body.classList.add("theme-" + themeName);
  document.querySelectorAll(".theme-swatch-box").forEach(el => el.classList.remove("active"));
  const activeBox = document.getElementById("ts-" + themeName);
  if (activeBox) activeBox.classList.add("active");
}
function saveSystemSettingsAndApply() {
  const keyInputField = document.getElementById("api-key-input");
  const defaultKeyCheckbox = document.getElementById("use-default-key-checkbox");
  const model = document.getElementById("model-id-input").value;
  const signature = document.getElementById("custom-signature-input").value;
  const identity = document.getElementById("custom-identity-name-input").value.trim();
  if (defaultKeyCheckbox && defaultKeyCheckbox.checked) {
    localStorage.removeItem("aether_api_key");
    localStorage.removeItem("kashyapai_key");
  } else {
    localStorage.setItem("aether_api_key", keyInputField.value.trim());
  }
  localStorage.setItem("aether_model", model);
  localStorage.setItem("aether_theme", selectedThemeSkin);
  localStorage.setItem("aether_signature", signature);
  if (identity) {
    autonomousEngineName = identity;
    localStorage.setItem("aether_dynamic_name", identity);
    const n = document.getElementById("workspace-name-display");
    if (n) n.innerText = identity;
  }
  document.getElementById("current-engine-display").innerText = model;
  closeSettingsViewPanel();
}

function spawnAeroSystemErrorToast(errorCode, errorMessage) {
  const layer = document.getElementById("system-toast-layer");
  const card = document.createElement("div");
  card.className = "toast-card";
  card.innerHTML = `
    <div style="font-weight:700">⚠️ ${esc(String(errorCode))}:</div>
    <div style="flex:1;font-size:0.82rem">${esc(String(errorMessage))}</div>
    <button class="close-toast" onclick="this.parentElement.remove()">✕</button>
  `;
  layer.appendChild(card);
  setTimeout(() => { if (card) card.remove(); }, 8000);
}

function processIncomingFileStreams(input) {
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    const isImage = file.type.startsWith("image/");
    reader.onload = function(e) {
      if (isImage) {
        attachedFileBuffers.push({ type: "inline_data", mimeType: file.type, base64Data: e.target.result.split(",")[1], fileName: file.name });
      } else {
        attachedFileBuffers.push({ type: "text_doc", fileName: file.name, contentStr: e.target.result });
      }
      updateFileAttachmentChipsUI();
    };
    if (isImage) reader.readAsDataURL(file); else reader.readAsText(file);
  });
  input.value = "";
}
function updateFileAttachmentChipsUI() {
  const zone = document.getElementById("chips-preview-zone");
  zone.innerHTML = "";
  attachedFileBuffers.forEach((file, index) => {
    const chip = document.createElement("div");
    chip.className = "file-chip";
    chip.innerHTML = `📁 ${esc(file.fileName)} <span onclick="removeAttachedFileChip(${index})">×</span>`;
    zone.appendChild(chip);
  });
}
function removeAttachedFileChip(idx) {
  attachedFileBuffers.splice(idx, 1);
  updateFileAttachmentChipsUI();
}

function parseMarkdownEngineText(text) {
  let cleanText = text
    .replace(/\[SET_IDENTITY_NAME:\s*[^\]]+\]/gi, "")
    .replace(/\[FETCH_URL:\s*[^\]]+\]/gi, "")
    .trim();
  let blocks = cleanText.split("```");
  let renderedResult = [];
  for (let i = 0; i < blocks.length; i++) {
    if (i % 2 === 1) {
      let lines = blocks[i].split("\n");
      let language = lines[0].trim() || "code";
      let codeContent = lines.slice(1).join("\n").trim();
      let safeCode = codeContent.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      let uniqueId = "code_" + Math.random().toString(36).substr(2, 9);
      renderedResult.push(`<div class="code-container"><div class="code-header"><span>⚡ ${language.toUpperCase()}</span><button class="copy-btn" onclick="copyCodeSnippetBlockToClipboard('${uniqueId}', this)">Copy Code</button></div><pre class="code-content" id="${uniqueId}">${safeCode}</pre></div>`);
    } else {
      let html = blocks[i].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
      let lines = html.split("\n");
      let inList = false;
      lines.forEach(line => {
        let trimmed = line.trim();
        if (trimmed.startsWith("### ")) { if (inList) { renderedResult.push("</ul>"); inList = false; } renderedResult.push(`<h3>${trimmed.substring(4)}</h3>`); return; }
        if (trimmed.startsWith("## ")) { if (inList) { renderedResult.push("</ul>"); inList = false; } renderedResult.push(`<h2>${trimmed.substring(3)}</h2>`); return; }
        if (trimmed.startsWith("# ")) { if (inList) { renderedResult.push("</ul>"); inList = false; } renderedResult.push(`<h1>${trimmed.substring(2)}</h1>`); return; }
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          if (!inList) { renderedResult.push("<ul>"); inList = true; }
          let itemText = trimmed.substring(2).replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>");
          renderedResult.push(`<li>${itemText}</li>`); return;
        }
        if (inList) { renderedResult.push("</ul>"); inList = false; }
        let inlineText = line.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>");
        if (trimmed === "") renderedResult.push("<br>");
        else renderedResult.push(`<p>${inlineText}</p>`);
      });
      if (inList) renderedResult.push("</ul>");
    }
  }
  return renderedResult.join("");
}
function copyCodeSnippetBlockToClipboard(elementId, elementBtn) {
  const pre = document.getElementById(elementId);
  if (!pre) return;
  navigator.clipboard.writeText(pre.innerText).then(() => {
    elementBtn.innerText = "Copied!";
    setTimeout(() => { elementBtn.innerText = "Copy Code"; }, 2000);
  });
}
function scrollToBottomSmoothly() {
  const win = document.getElementById("chat-window");
  if (win) win.scrollTop = win.scrollHeight;
}
function appendUIMessageBubble(text, role, isThinkingNode, filesArray, character) {
  const win = document.getElementById("chat-window");
  const dash = win.querySelector(".welcome-dashboard");
  if (dash) dash.remove();
  const div = document.createElement("div");
  div.className = `message ${role}`;
  if (isThinkingNode) {
    div.innerHTML = text;
  } else {
    let contentHtml = "";
    if (role === "bot" && character) {
      contentHtml += `<div class="char-name">${esc(character.name)}</div>`;
    }
    if (filesArray && filesArray.length) {
      contentHtml += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">`;
      filesArray.forEach(f => {
        if (f.mimeType && f.mimeType.startsWith("image/")) {
          contentHtml += `<div style="border-radius:6px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);max-width:180px"><img src="data:${f.mimeType};base64,${f.base64Data}" style="max-width:100%;object-fit:cover" title="${esc(f.fileName)}"/></div>`;
        } else {
          contentHtml += `<div style="background:rgba(255,255,255,0.1);border:1px solid var(--border);padding:4px 8px;border-radius:6px;font-size:0.78rem">📎 ${esc(f.name || f.fileName)}</div>`;
        }
      });
      contentHtml += `</div>`;
    }
    contentHtml += parseMarkdownEngineText(text || "");
    div.innerHTML = contentHtml;
  }
  win.appendChild(div);
  scrollToBottomSmoothly();
  return div;
}

function processAetherOutputCommands(aiTextResponse) {
  const terminal = document.getElementById("agentic-execution-terminal");
  const statusLabel = document.getElementById("terminal-status-node");
  const logBox = document.getElementById("terminal-stream-log-output");
  if (!terminal) return;
  const nameMatch = aiTextResponse.match(/\[SET_IDENTITY_NAME:\s*([^\]]+)\]/i);
  if (nameMatch && nameMatch[1]) {
    const targetNewName = nameMatch[1].trim();
    terminal.style.display = "block";
    statusLabel.innerText = "[INTERCEPT ACTIVE]";
    statusLabel.style.color = "#a855f7";
    logBox.innerHTML = `> Identity reassignment: "${autonomousEngineName}" → "${esc(targetNewName)}"...`;
    setTimeout(() => {
      autonomousEngineName = targetNewName;
      localStorage.setItem("aether_dynamic_name", targetNewName);
      const n = document.getElementById("workspace-name-display");
      if (n) n.innerText = targetNewName;
      const i = document.getElementById("custom-identity-name-input");
      if (i) i.value = targetNewName;
      logBox.innerHTML += `<br><span style="color:#10b981">> [SUCCESS] Entity transformed to ${esc(targetNewName)}.</span>`;
      statusLabel.innerText = "[ONLINE]";
      statusLabel.style.color = "#10b981";
    }, 1200);
    setTimeout(() => { terminal.style.display = "none"; }, 6000);
  }
}

async function dispatchUserPayloadStream() {
  if (!activeSessionId || !chatSessions[activeSessionId]) {
    spawnAeroSystemErrorToast("Chat", "Open a character chat first.");
    return;
  }
  const inputField = document.getElementById("user-text-input");
  let userPromptText = inputField.value.trim();
  const apiKey = localStorage.getItem("aether_api_key") || localStorage.getItem("kashyapai_key") || INITIAL_WORKSPACE_API_KEY;
  const modelId = localStorage.getItem("aether_model") || localStorage.getItem("kashyapai_model") || "gemini-3-flash-preview";
  const signature = localStorage.getItem("aether_signature") || localStorage.getItem("kashyapai_signature") || "";
  if (!apiKey) { spawnAeroSystemErrorToast("Setup", "Missing API key in Protocols."); return; }
  if (!userPromptText && attachedFileBuffers.length === 0) return;

  const session = chatSessions[activeSessionId];
  const character = getCharacter(session.characterId);
  const isFirstUser = !session.history.some(h => h.role === "user");
  if (isFirstUser && userPromptText) {
    session.title = userPromptText.substring(0, 28) + (userPromptText.length > 28 ? "…" : "");
  }

  let textPartsCompiled = [];
  let payloadPartsArray = [];
  let filesSentInThisMessage = JSON.parse(JSON.stringify(attachedFileBuffers));
  attachedFileBuffers.forEach(file => {
    if (file.type === "inline_data") payloadPartsArray.push({ inlineData: { mimeType: file.mimeType, data: file.base64Data } });
    else if (file.type === "text_doc") textPartsCompiled.push(`\n[Attached File Context: ${file.fileName}]\n${file.contentStr}\n`);
  });
  if (userPromptText) textPartsCompiled.push(userPromptText);
  payloadPartsArray.unshift({ text: textPartsCompiled.join("\n") });

  appendUIMessageBubble(userPromptText, "user", false, filesSentInThisMessage, character);
  inputField.value = "";
  document.getElementById("chips-preview-zone").innerHTML = "";
  session.history.push({ role: "user", parts: payloadPartsArray, metadataFiles: filesSentInThisMessage });
  session.updatedAt = Date.now();
  renderSidebarSessions();
  attachedFileBuffers = [];

  document.body.classList.add("ai-thinking");
  const loadingBubble = appendUIMessageBubble(`<div class="thinking-dots"><span></span><span></span><span></span></div>`, "bot", true);
  const signatureContext = signature ? `\n\nAppend this plain signature at the end of every response: "\n\n${signature}"` : "";
  const systemText = (character ? buildCharacterSystemPrompt(character) : `You are ${autonomousEngineName}.`) + signatureContext;

  // Gemini history: map roles; keep only text/inline for API
  const contents = session.history.map(h => ({
    role: h.role === "model" ? "model" : "user",
    parts: h.parts
  }));

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemText }] }
      })
    });
    const data = await response.json();
    document.body.classList.remove("ai-thinking");
    loadingBubble.remove();
    if (data.error) {
      session.history.pop();
      spawnAeroSystemErrorToast(data.error.code || "API", data.error.message || "Request failed");
      saveSessions();
    } else {
      let answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "(empty reply)";
      processAetherOutputCommands(answer);
      // Web fetch loop (max 2 hops)
      for (let hop = 0; hop < 2; hop++) {
        const fetchMatch = answer.match(/\[FETCH_URL:\s*(https?:\/\/[^\s\]]+)\]/i);
        if (!fetchMatch) break;
        const url = fetchMatch[1].replace(/[.,;)]+$/, "");
        appendUIMessageBubble(answer, "bot", false, [], character);
        session.history.push({ role: "model", parts: [{ text: answer }] });
        const pageText = await fetchPublicPageText(url);
        const toolMsg = `[Web page retrieved: ${url}]\n\n${pageText}\n\n(Use this content. Do not repeat the FETCH_URL tag unless you need another page.)`;
        session.history.push({ role: "user", parts: [{ text: toolMsg }] });
        const loading2 = appendUIMessageBubble(`<div class="thinking-dots"><span></span><span></span><span></span></div>`, "bot", true);
        document.body.classList.add("ai-thinking");
        const contents2 = session.history.map(h => ({
          role: h.role === "model" ? "model" : "user",
          parts: h.parts
        }));
        const response2 = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: contents2,
            systemInstruction: { parts: [{ text: systemText }] }
          })
        });
        const data2 = await response2.json();
        document.body.classList.remove("ai-thinking");
        loading2.remove();
        if (data2.error) {
          answer = `I tried to open ${url} but the request failed: ${data2.error.message || "error"}`;
          break;
        }
        answer = data2.candidates?.[0]?.content?.parts?.[0]?.text || "(empty reply after fetch)";
        processAetherOutputCommands(answer);
      }
      session.history.push({ role: "model", parts: [{ text: answer }] });
      session.updatedAt = Date.now();
      appendUIMessageBubble(answer, "bot", false, [], character);
      saveSessions();
      renderSidebarSessions();
    }
  } catch (e) {
    document.body.classList.remove("ai-thinking");
    loadingBubble.remove();
    session.history.pop();
    spawnAeroSystemErrorToast("Network", "Request failed or was blocked.");
    saveSessions();
  }
}

async function fetchPublicPageText(url) {
  const terminal = document.getElementById("agentic-execution-terminal");
  const statusLabel = document.getElementById("terminal-status-node");
  const logBox = document.getElementById("terminal-stream-log-output");
  if (terminal) {
    terminal.style.display = "block";
    if (statusLabel) { statusLabel.innerText = "[FETCHING]"; statusLabel.style.color = "#a855f7"; }
    if (logBox) logBox.innerHTML = `> Opening ${esc(url)}…`;
  }
  try {
    // Prefer CORS-friendly proxies; fall back to direct fetch
    const proxies = [
      (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
      (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`
    ];
    let text = "";
    let lastErr = null;
    for (const build of proxies) {
      try {
        const res = await fetch(build(url), { method: "GET" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        text = await res.text();
        lastErr = null;
        break;
      } catch (err) { lastErr = err; }
    }
    if (lastErr && !text) {
      try {
        const res = await fetch(url);
        text = await res.text();
      } catch (e) {
        if (logBox) logBox.innerHTML += `<br><span style="color:#f87171">> Failed: ${esc(String(lastErr.message || lastErr))}</span>`;
        if (statusLabel) { statusLabel.innerText = "[OFFLINE]"; statusLabel.style.color = "#f87171"; }
        setTimeout(() => { if (terminal) terminal.style.display = "none"; }, 4000);
        return `(Could not retrieve page. CORS or network blocked access to ${url}.)`;
      }
    }
    // Strip scripts/styles and collapse to readable text
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length > 12000) text = text.slice(0, 12000) + "… [truncated]";
    if (logBox) logBox.innerHTML += `<br><span style="color:#10b981">> Retrieved ${text.length} characters.</span>`;
    if (statusLabel) { statusLabel.innerText = "[ONLINE]"; statusLabel.style.color = "#10b981"; }
    setTimeout(() => { if (terminal) terminal.style.display = "none"; }, 3500);
    return text || "(Page returned no readable text.)";
  } catch (e) {
    if (logBox) logBox.innerHTML += `<br><span style="color:#f87171">> ${esc(String(e.message || e))}</span>`;
    if (statusLabel) { statusLabel.innerText = "[OFFLINE]"; statusLabel.style.color = "#f87171"; }
    setTimeout(() => { if (terminal) terminal.style.display = "none"; }, 4000);
    return `(Fetch error: ${e.message || e})`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadAll();
  loadLocalConfigurations();
  renderGallery();
  renderSidebarSessions();
  showView("gallery");

  const inputField = document.getElementById("user-text-input");
  if (inputField) {
    inputField.addEventListener("paste", (event) => {
      const clipboardItems = (event.clipboardData || window.clipboardData).items;
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          event.preventDefault();
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onload = function(e) {
            attachedFileBuffers.push({
              type: "inline_data",
              mimeType: file.type,
              base64Data: e.target.result.split(",")[1],
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
