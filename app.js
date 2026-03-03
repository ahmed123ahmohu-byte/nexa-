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
const clickSound = document.getElementById("clickSound");
const particles = document.getElementById("particles");

let currentUser = "";
let latestCode = "";

const line1 = "نيكسا ليس مجرد عميل… بل هو المستقبل";
const line2 = "مصنوع بفخر من طلاب عرب";

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
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

async function bootSplash() {
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
  const blockMatch = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!blockMatch) return null;
  return {
    language: blockMatch[1] || "plain",
    code: blockMatch[2].trim(),
  };
}

function setCodeMode(data) {
  if (!data || !data.code) {
    chatLayout.classList.remove("split");
    codePanel.classList.remove("visible");
    return;
  }
  latestCode = data.code;
  codeLanguage.textContent = `اللغة: ${data.language}`;
  codeContent.textContent = data.code;
  chatLayout.classList.add("split");
  codePanel.classList.add("visible");
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
  if (userCode) {
    setCodeMode(userCode);
  }

  simulateReply(text);
});

copyCodeBtn.addEventListener("click", async () => {
  if (!latestCode) return;
  await navigator.clipboard.writeText(latestCode);
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
