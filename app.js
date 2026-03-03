const splash = document.getElementById("splash");
const login = document.getElementById("login");
const chatScreen = document.getElementById("chatScreen");
const heroLine = document.getElementById("heroLine");
const subLine = document.getElementById("subLine");
const startBtn = document.getElementById("startBtn");
const enterBtn = document.getElementById("enterBtn");
const nameInput = document.getElementById("nameInput");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const typingIndicator = document.getElementById("typingIndicator");
const chatLayout = document.getElementById("chatLayout");
const codePanel = document.getElementById("codePanel");
const codeContent = document.getElementById("codeContent");
const codeLanguage = document.getElementById("codeLanguage");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const runCodeBtn = document.getElementById("runCodeBtn");
const closeCodeBtn = document.getElementById("closeCodeBtn");
const runResult = document.getElementById("runResult");
const clickSound = document.getElementById("clickSound");
const particles = document.getElementById("particles");
const soundToggle = document.getElementById("soundToggle");
const langToggle = document.getElementById("langToggle");
const modeHint = document.getElementById("modeHint");

let currentUser = "";
let latestCode = "";
let latestLanguage = "plaintext";
let soundEnabled = false;
let forcedLanguage = "auto";
const clickSound = document.getElementById("clickSound");
const particles = document.getElementById("particles");

let currentUser = "";
let latestCode = "";

const line1 = "نيكسا ليس مجرد عميل… بل هو المستقبل";
const line2 = "مصنوع بفخر من طلاب عرب";

const labels = {
  ar: {
    typing: "Nexa يكتب...",
    placeholder: "اكتب رسالتك...",
    welcome: (name) => `أهلًا يا ${name} 👋\nجاهز نبدأ نصنع حاجة عظيمة؟`,
    intro: "أنا Nexa… مش مجرد AI. أنا شريكك في كل فكرة مجنونة 💡🔥",
    modeFriendly: "صديقك الذكي في الكود والإبداع",
    modePro: "Professional Engineering Mode",
    codeMsg: "تمام… خليني أبنيها صح 👨‍💻",
    bugMsg: "مممم… واضح إن في Bug مستخبي هنا 😏 خليني أطلعه.",
    runSoon: "تشغيل مباشر متاح الآن فقط لـ JavaScript.",
    noCode: "مفيش كود للتشغيل حاليًا.",
    copied: "Copied!",
    lang: "اللغة",
  },
  en: {
    typing: "Nexa is typing...",
    placeholder: "Type your message...",
    welcome: (name) => `Hey ${name} 👋\nReady to build something great?`,
    intro: "I'm Nexa — not just AI. I'm your partner for every bold idea 💡🔥",
    modeFriendly: "Your smart friend for code & creativity",
    modePro: "Professional Engineering Mode",
    codeMsg: "Perfect... I'll build it the right way 👨‍💻",
    bugMsg: "Hmm... there is a hidden bug 😏 Let me pull it out.",
    runSoon: "Live run currently supports JavaScript only.",
    noCode: "No code available to run yet.",
    copied: "Copied!",
    lang: "Language",
  },
};

function resolveLang(text = "") {
  if (forcedLanguage !== "auto") return forcedLanguage;
  const arabic = /[\u0600-\u06FF]/.test(text);
  return arabic ? "ar" : "en";
}

function t(key, lang, ...args) {
  const dict = labels[lang] || labels.ar;
  const value = dict[key];
  return typeof value === "function" ? value(...args) : value;
}

function setUIText(lang) {
  document.querySelector("#typingIndicator small").textContent = t("typing", lang);
  messageInput.placeholder = t("placeholder", lang);
  modeHint.textContent = t("modeFriendly", lang);
}

function typeText(el, text, speed = 42) {
function typeText(el, text, speed = 45) {
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i);
      i += 1;
      if (i > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function playClick() {
  if (!soundEnabled) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

async function bootSplash() {
  await typeText(heroLine, line1, 44);
  await typeText(subLine, line2, 34);
  await typeText(heroLine, line1, 46);
  await typeText(subLine, line2, 35);
  startBtn.classList.remove("hidden");
}

function switchScreen(from, to) {
  from.classList.remove("active");
  setTimeout(() => to.classList.add("active"), 180);
}

function addMessage(text, role = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function detectCode(text) {
  const blockMatch = text.match(/```([\w#+-]+)?\n([\s\S]*?)```/);
  if (!blockMatch) return null;
  return {
    language: (blockMatch[1] || "plaintext").toLowerCase(),
  const blockMatch = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!blockMatch) return null;
  return {
    language: blockMatch[1] || "plain",
    code: blockMatch[2].trim(),
  };
}

function applyHighlight() {
  codeContent.className = `language-${latestLanguage}`;
  if (window.hljs) {
    window.hljs.highlightElement(codeContent);
  }
}

function setCodeMode(data) {
  if (!data || !data.code) {
    chatLayout.classList.remove("split");
    codePanel.classList.remove("visible");
    runResult.classList.add("hidden");
    runResult.textContent = "";
    return;
  }

  latestCode = data.code;
  latestLanguage = data.language;
  codeLanguage.textContent = `Language: ${data.language}`;
  codeContent.textContent = data.code;
  applyHighlight();

    return;
  }
  latestCode = data.code;
  codeLanguage.textContent = `اللغة: ${data.language}`;
  codeContent.textContent = data.code;
  chatLayout.classList.add("split");
  codePanel.classList.add("visible");
}

function jsTemplate(name) {
  return `function greet(name) {\n  return \`Hello ${name}, Nexa is ready 🚀\`;\n}\n\nconsole.log(greet("${name}"));`;
}

function pyTemplate(name) {
  return `def greet(name):\n    return f"أهلًا {name}، جاهزين نبني حاجة عظيمة!"\n\nprint(greet("${name}"))`;
}

function professionalReply(lang) {
  if (lang === "en") {
    return "Switching to pro mode: I'll provide architecture, edge cases, and production-grade code quality.";
  }
  return "تمام، هنحول للوضع الاحترافي: Architecture واضح، Edge Cases، وجودة كود إنتاجية.";
}

function replyFor(text, lang) {
  const normalized = text.toLowerCase();
  const wantsPro = /(architecture|system design|هندسة|تحليل|production)/i.test(text);

  if (wantsPro) {
    modeHint.textContent = t("modePro", lang);
    return professionalReply(lang);
  }

  modeHint.textContent = t("modeFriendly", lang);

  if (normalized.includes("debug") || normalized.includes("bug") || normalized.includes("خطأ")) {
    return t("bugMsg", lang);
  }

  if (/(python|بايثون)/i.test(text)) {
    return `${t("codeMsg", lang)}\n\n\`\`\`python\n${pyTemplate(currentUser || "صديقي")}\n\`\`\``;
  }

  if (/(javascript|js|جافاسكريبت|code|كود)/i.test(text)) {
    return `${t("codeMsg", lang)}\n\n\`\`\`javascript\n${jsTemplate(currentUser || "friend")}\n\`\`\``;
  }

  return `${t("intro", lang)}\n${lang === "en" ? "Tell me what you want to build and let's ship it." : "قولّي عايز تبني إيه وأنا معاك للنهاية."}`;
}

function simulateReply(input) {
  const lang = resolveLang(input);
  setUIText(lang);

  typingIndicator.classList.remove("hidden");
  setTimeout(() => {
    typingIndicator.classList.add("hidden");
    const reply = replyFor(input, lang);
    addMessage(reply, "bot");
    const codeData = detectCode(reply);
    setCodeMode(codeData);
  }, 850);
}

function runJavaScript(code) {
  const logs = [];
  const customConsole = {
    log: (...args) => logs.push(args.map(String).join(" ")),
  };

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function("console", code);
    fn(customConsole);
    return { ok: true, output: logs.join("\n") || "(no output)" };
  } catch (error) {
    return { ok: false, output: String(error) };
  }
function replyFor(text) {
  const normalized = text.toLowerCase();
  if (normalized.includes("debug") || normalized.includes("bug") || normalized.includes("خطأ")) {
    return "مممم… واضح إن في Bug مستخبي هنا 😏 خليني أطلعه.";
  }
  if (normalized.includes("كود") || normalized.includes("code") || normalized.includes("python")) {
    return `تمام… خليني أبنيها صح 👨‍💻\n\n\`\`\`python\ndef greet(name):\n    return f\"أهلًا {name}، جاهزين نبني حاجة عظيمة!\"\n\nprint(greet(\"${currentUser || "صديقي"}\"))\n\`\`\``;
  }
  return "أنا Nexa… مش مجرد AI. أنا شريكك في كل فكرة مجنونة 💡🔥\nقولّي عايز تبني إيه وأنا معاك للنهاية.";
}

function simulateReply(input) {
  typingIndicator.classList.remove("hidden");
  setTimeout(() => {
    typingIndicator.classList.add("hidden");
    const reply = replyFor(input);
    addMessage(reply, "bot");
    const codeData = detectCode(reply);
    setCodeMode(codeData);
  }, 900);
}

startBtn.addEventListener("click", () => {
  playClick();
  switchScreen(splash, login);
  setTimeout(() => nameInput.focus(), 400);
});

enterBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) return;

  playClick();
  currentUser = name;
  sessionStorage.setItem("nexa_user", name);
  switchScreen(login, chatScreen);

  setTimeout(() => {
    const lang = resolveLang(name);
    setUIText(lang);
    addMessage(t("welcome", lang, currentUser), "bot");
    addMessage(t("intro", lang), "bot");
  }, 360);
  playClick();
  currentUser = name;
  switchScreen(login, chatScreen);
  setTimeout(() => {
    addMessage(`أهلًا يا ${currentUser} 👋\nجاهز نبدأ نصنع حاجة عظيمة؟`, "bot");
    addMessage("أنا Nexa… مش مجرد AI. أنا شريكك في كل فكرة مجنونة 💡🔥", "bot");
  }, 380);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  playClick();
  addMessage(text, "user");
  messageInput.value = "";

  const userCode = detectCode(text);
  if (userCode) setCodeMode(userCode);
  if (userCode) {
    setCodeMode(userCode);
  }

  simulateReply(text);
});

copyCodeBtn.addEventListener("click", async () => {
  if (!latestCode) return;
  await navigator.clipboard.writeText(latestCode);
  copyCodeBtn.textContent = labels.en.copied;
  setTimeout(() => {
    copyCodeBtn.textContent = "Copy";
  }, 900);
});

closeCodeBtn.addEventListener("click", () => {
  playClick();
  setCodeMode(null);
});

runCodeBtn.addEventListener("click", () => {
  const lang = resolveLang(messageInput.value || latestCode || "");
  if (!latestCode) {
    addMessage(t("noCode", lang), "bot");
    return;
  }

  runResult.classList.remove("hidden");

  if (latestLanguage === "javascript" || latestLanguage === "js") {
    const res = runJavaScript(latestCode);
    runResult.style.borderColor = res.ok ? "rgba(137,255,157,.45)" : "rgba(255,143,154,.65)";
    runResult.textContent = res.output;
    return;
  }

  runResult.style.borderColor = "rgba(255,255,255,.2)";
  runResult.textContent = t("runSoon", lang);
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "🔊 صوت" : "🔈 صوت";
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  playClick();
});

langToggle.addEventListener("click", () => {
  const cycle = ["auto", "ar", "en"];
  const next = cycle[(cycle.indexOf(forcedLanguage) + 1) % cycle.length];
  forcedLanguage = next;
  langToggle.textContent = next === "auto" ? "🌍 Auto" : `🌍 ${next.toUpperCase()}`;
  setUIText(resolveLang(messageInput.value));
});

for (let i = 0; i < 44; i += 1) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = `${Math.random() * 100}%`;
  p.style.animationDuration = `${7 + Math.random() * 7}s`;
  p.style.animationDelay = `${Math.random() * 8}s`;
  particles.appendChild(p);
}

const savedUser = sessionStorage.getItem("nexa_user");
if (savedUser) {
  currentUser = savedUser;
  switchScreen(splash, chatScreen);
  setTimeout(() => {
    const lang = resolveLang(savedUser);
    setUIText(lang);
    addMessage(t("welcome", lang, savedUser), "bot");
  }, 350);
} else {
  bootSplash();
}
  copyCodeBtn.textContent = "Copied!";
  setTimeout(() => (copyCodeBtn.textContent = "Copy"), 1000);
});

runCodeBtn.addEventListener("click", () => {
  addMessage("التشغيل المباشر قيد التفعيل قريبًا ⚡", "bot");
});

for (let i = 0; i < 36; i += 1) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = `${Math.random() * 100}%`;
  p.style.animationDuration = `${8 + Math.random() * 8}s`;
  p.style.animationDelay = `${Math.random() * 7}s`;
  particles.appendChild(p);
}

bootSplash();
