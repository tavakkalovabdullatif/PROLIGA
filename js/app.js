// 🔴 TELEGRAM BOT MA'LUMOTLARI
const BOT_TOKEN = "7013444749:AAF9VTswEGfgZBH0tG0qQw1TUKOa0T7JYu";
const CHAT_ID = "7013444749";

// DOM elementlar
const ism = document.getElementById("ism");
const familya = document.getElementById("familya");
const sinf = document.getElementById("sinf");
const harf = document.getElementById("harf");
const taklif = document.getElementById("taklif");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const sectionTitle = document.getElementById("sectionTitle");

let user = {};
let section = "";

// 1-qadam: Foydalanuvchi ma'lumotlarini tekshirish
function nextStep() {
  user.ism = ism.value.trim();
  user.familya = familya.value.trim();
  user.sinf = sinf.value.trim();
  user.harf = harf.value.trim();

  if (!user.ism || !user.familya || !user.sinf || !user.harf) {
    alert("Hamma joyni to‘ldiring!");
    return;
  }

  step1.classList.add("hidden");
  step2.classList.remove("hidden");
}

// 2-qadam: Bo‘lim tanlash
function openSection(sec) {
  section = sec;
  sectionTitle.innerText = `${sec} bo‘limi uchun taklif`;
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
}

// 3-qadam: Taklifni yuborish
function sendToBot() {
  const taklifMatni = taklif.value.trim();

  if (!taklifMatni) {
    alert("Taklif yozing!");
    return;
  }

  const msg = `📥 YANGI TAKLIF

👤 Ism: ${user.ism}
👤 Familya: ${user.familya}
🏫 Sinf: ${user.sinf}-${user.harf}

📂 Bo‘lim: ${section}

✍️ Taklif:
${taklifMatni}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg,
    }),
  })
    .then(() => {
      alert("Yuborildi ✅");
      location.reload();
    })
    .catch(() => {
      alert("Xatolik yuz berdi ❌");
    });
}
