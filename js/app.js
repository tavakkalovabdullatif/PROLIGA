/* 🔴 TELEGRAM BOT MA'LUMOTLARI */
const BOT_TOKEN = "8554912876:AAH-O98gL-hHB7GRsWjYwcYpel4OKM6XRGw";
const CHAT_ID = "8074394669";

let user = {};
let section = "";

function nextStep() {
  user.ism = ism.value;
  user.familya = familya.value;
  user.sinf = sinf.value;
  user.harf = harf.value;

  if (!user.ism || !user.familya || !user.sinf || !user.harf) {
    alert("Hamma joyni to‘ldir!");
    return;
  }
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
}

function openSection(sec) {
  section = sec;
  sectionTitle.innerText = sec + " bo‘limi uchun taklif";
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
}

function sendToBot() {
  if (!taklif.value) {
    alert("Taklif yoz!");
    return;
  }

  const msg = `📥 YANGI TAKLIF

👤 Ism: ${user.ism}
👤 Familya: ${user.familya}
🏫 Sinf: ${user.sinf}-${user.harf}

📂 Bo‘lim: ${section}

✍️ Taklif:
${taklif.value}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
  })
    .then(() => {
      alert("Yuborildi ✅");
      location.reload();
    })
    .catch(() => {
      alert("Xatolik ❌");
    });
}
