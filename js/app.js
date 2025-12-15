const ADMIN_PASSWORD = "Otabek2215";
let users = JSON.parse(localStorage.getItem("users") || "{}");
let currentUser = null;

// Sahifa yuklanganda foydalanuvchini tekshirish
window.onload = function () {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    showWelcome(currentUser);
  }
};

// LOGIN / REGISTER
function openModal(action) {
  document.getElementById("modal-bg").style.display = "flex";
  document.getElementById("modal-title").innerText =
    action === "login" ? "Kirish" : "Ro‘yxatdan o‘tish";
  document.getElementById("modal-msg").innerText = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) {
    document.getElementById("modal-msg").innerText =
      "Iltimos, barcha maydonlarni to‘ldiring!";
    return;
  }

  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
  currentUser = username;
  localStorage.setItem("currentUser", currentUser);
  showWelcome(username);
  document.getElementById("modal-bg").style.display = "none";
}

function showWelcome(username) {
  document.getElementById("menu").style.display = "none";
  const welcome = document.getElementById("welcome-msg");
  welcome.style.display = "block";
  const userClass = localStorage.getItem("userClass_" + username) || "";
  welcome.innerText =
    "Xush kelibsiz, " + username + (userClass ? " (" + userClass + ")" : "");
  document.getElementById("confirm-class-btn").style.display = userClass
    ? "none"
    : "inline-block";
}

// Sinfni chiroyli modal orqali tasdiqlash
function openClassModal() {
  document.getElementById("class-modal-bg").style.display = "flex";
}
function confirmClassModal() {
  const num = document.getElementById("class-num").value.trim();
  const letter = document
    .getElementById("class-letter")
    .value.trim()
    .toUpperCase();
  if (!num || !letter) {
    alert("Iltimos, sinf raqami va harfini kiriting");
    return;
  }
  const fullClass = num + letter;
  localStorage.setItem("userClass_" + currentUser, fullClass);
  document.getElementById("class-modal-bg").style.display = "none";
  showWelcome(currentUser);
}

// Yangiliklar
function openNews() {
  document.getElementById("main-section").style.display = "none";
  document.getElementById("news-section").style.display = "block";
  loadNews();
}
function backHome() {
  document.getElementById("news-section").style.display = "none";
  document.getElementById("main-section").style.display = "block";
}
function adminCheck() {
  const pass = prompt("Admin parolni kiriting:");
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("news-modal-bg").style.display = "flex";
  } else {
    alert("❌ Noto‘g‘ri parol!");
  }
}
function addNews() {
  const text = document.getElementById("news-text").value.trim();
  const img = document.getElementById("news-img").value.trim();
  const video = document.getElementById("news-video").value.trim();
  if (!text && !img && !video) {
    alert("Kamida bitta maydon to‘ldiring!");
    return;
  }
  let news = JSON.parse(localStorage.getItem("news") || "[]");
  news.unshift({ text, img, video });
  localStorage.setItem("news", JSON.stringify(news));
  document.getElementById("news-modal-bg").style.display = "none";
  document.getElementById("news-text").value = "";
  document.getElementById("news-img").value = "";
  document.getElementById("news-video").value = "";
  loadNews();
}
function loadNews() {
  const list = document.getElementById("news-list");
  list.innerHTML = "";
  let news = JSON.parse(localStorage.getItem("news") || "[]");
  if (news.length === 0) {
    list.innerHTML = "<p>Hozircha yangilik kiritilmadi</p>";
    return;
  }
  news.forEach((n) => {
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `<p>${n.text || ""}</p>${
      n.img ? `<img src="${n.img}">` : ""
    }${n.video ? `<video controls src="${n.video}"></video>` : ""}`;
    list.appendChild(div);
  });
}

// Modalni click bilan yopish
document.getElementById("modal-bg").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.style.display = "none";
});
document.getElementById("class-modal-bg").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.style.display = "none";
});
document.getElementById("news-modal-bg").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.style.display = "none";
});

// ❄️ Qor animatsiyasi
const snowCount = 50;
for (let i = 0; i < snowCount; i++) {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.width = snow.style.height = 5 + Math.random() * 5 + "px";
  snow.style.opacity = 0.5 + Math.random() * 0.5;
  snow.style.animationDuration = 5 + Math.random() * 5 + "s";
  snow.style.animationName = "fall";
  document.body.appendChild(snow);
}
const style = document.createElement("style");
style.innerHTML = `@keyframes fall {0% {transform: translateY(-10px);}100% {transform: translateY(110vh);}}.snowflake {animation-timing-function: linear; animation-iteration-count: infinite;}`;
document.head.appendChild(style);
