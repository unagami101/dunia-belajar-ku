// =====================
// Variabel Global
// =====================
let userData = {};
let currentModule = "";
let currentQuestion = 0;
let questions = [];
let userStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  studyTime: 0,
  startTime: Date.now(),
};
let selectedCharacter = "cute";

// =====================
// Konten Berdasarkan Usia
// =====================
const contentByAge = {
  kids: {
    // 3-9 tahun
    modules: [
      {
        id: "colors",
        name: "Warna-warni",
        icon: "🌈",
        desc: "Belajar mengenal warna",
      },
      {
        id: "numbers",
        name: "Angka Ajaib",
        icon: "🔢",
        desc: "Bermain dengan angka",
      },
      {
        id: "shapes",
        name: "Bentuk-bentuk",
        icon: "🔴",
        desc: "Mengenal bentuk geometri",
      },
      {
        id: "animals",
        name: "Teman Hewan",
        icon: "🐶",
        desc: "Kenal dengan hewan",
      },
      { id: "letters", name: "Huruf ABC", icon: "📝", desc: "Belajar membaca" },
    ],
    questions: {
      colors: [
        {
          q: "Warna apel merah adalah...",
          answers: ["Merah", "Biru", "Hijau", "Kuning"],
          correct: 0,
        },
        {
          q: "Warna langit cerah adalah...",
          answers: ["Merah", "Biru", "Hijau", "Kuning"],
          correct: 1,
        },
        {
          q: "Warna daun adalah...",
          answers: ["Merah", "Biru", "Hijau", "Kuning"],
          correct: 2,
        },
      ],
      numbers: [
        { q: "1 + 1 = ?", answers: ["1", "2", "3", "4"], correct: 1 },
        {
          q: "Berapa jari di satu tangan?",
          answers: ["3", "4", "5", "6"],
          correct: 2,
        },
      ],
    },
  },
  teen: {
    // 10-17 tahun
    modules: [
      {
        id: "math",
        name: "Matematika",
        icon: "🧮",
        desc: "Aljabar dan Geometri",
      },
      {
        id: "science",
        name: "IPA",
        icon: "🔬",
        desc: "Fisika, Kimia, Biologi",
      },
    ],
    questions: {
      math: [
        {
          q: "2x + 5 = 11, nilai x adalah...",
          answers: ["2", "3", "4", "5"],
          correct: 1,
        },
        {
          q: "Akar dari 144 adalah...",
          answers: ["10", "11", "12", "13"],
          correct: 2,
        },
      ],
      science: [
        {
          q: "Rumus kimia air adalah...",
          answers: ["H2O", "CO2", "NaCl", "CH4"],
          correct: 0,
        },
        {
          q: "Proses fotosintesis terjadi pada...",
          answers: ["Akar", "Batang", "Daun", "Bunga"],
          correct: 2,
        },
      ],
    },
  },
  adult: {
    // 18+ tahun
    modules: [
      {
        id: "logic",
        name: "Logika",
        icon: "🧠",
        desc: "Penalaran dan Problem Solving",
      },
      {
        id: "management",
        name: "Manajemen",
        icon: "📊",
        desc: "Kepemimpinan dan Organisasi",
      },
    ],
    questions: {
      logic: [
        {
          q: "Jika semua A adalah B, dan semua B adalah C, maka...",
          answers: [
            "Semua A adalah C",
            "Semua C adalah A",
            "Tidak ada hubungan",
            "Sebagian A adalah C",
          ],
          correct: 0,
        },
      ],
      management: [
        {
          q: "Manajemen adalah...",
          answers: ["Ilmu mengatur", "Olahraga", "Makanan", "Hewan"],
          correct: 0,
        },
      ],
    },
  },
};

// =====================
// Modul Minat Bakat
// =====================
const talentModules = [
  {
    id: "coding",
    name: "Coding",
    icon: "💻",
    desc: "Belajar pemrograman dasar",
  },
  { id: "design", name: "Desain", icon: "🎨", desc: "Kreativitas visual" },
  { id: "music", name: "Musik", icon: "🎵", desc: "Bermain musik" },
];

// =====================
// Fungsi Utama
// =====================
function startPlatform() {
  const name = document.getElementById("userName").value.trim();
  const age = parseInt(document.getElementById("userAge").value);

  if (!name || !age) {
    alert("Mohon isi nama dan umur kamu ya! 😊");
    return;
  }

  userData = { name, age };

  // Kategori umur
  if (age <= 9) userData.category = "kids";
  else if (age <= 17) userData.category = "teen";
  else userData.category = "adult";

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("mainPlatform").style.display = "block";

  initializePlatform();
}

function initializePlatform() {
  document.body.className = userData.category + "-mode";
  document.getElementById(
    "welcomeText"
  ).textContent = `Halo ${userData.name}! ✨`;

  if (userData.category === "teen") {
    document.getElementById("moodCheck").classList.remove("hidden");
    document.getElementById("moodButtons").classList.remove("hidden");
    document.getElementById("chatTab").classList.remove("hidden");
  }

  generateModules();
  generateTalentModules();
  updateStats();
}

function generateModules() {
  const grid = document.getElementById("modulesGrid");
  const modules = contentByAge[userData.category].modules;

  grid.innerHTML = modules
    .map(
      (module) => `
    <div class="module-card" onclick="startModule('${module.id}')">
      <div class="module-icon">${module.icon}</div>
      <h4>${module.name}</h4>
      <p>${module.desc}</p>
    </div>`
    )
    .join("");
}

function generateTalentModules() {
  const grid = document.getElementById("talentsGrid");
  grid.innerHTML = talentModules
    .map(
      (module) => `
    <div class="module-card" onclick="startTalentModule('${module.id}')">
      <div class="module-icon">${module.icon}</div>
      <h4>${module.name}</h4>
      <p>${module.desc}</p>
    </div>`
    )
    .join("");
}

// =====================
// Soal / Pertanyaan
// =====================
function startModule(moduleId) {
  currentModule = moduleId;
  const moduleQuestions = contentByAge[userData.category].questions[moduleId];

  if (!moduleQuestions) {
    alert("Modul ini sedang dalam pengembangan! 🚧");
    return;
  }

  questions = [...moduleQuestions];
  currentQuestion = 0;

  showSection("question");
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    completeModule();
    return;
  }

  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.q;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  const answersGrid = document.getElementById("answersGrid");
  answersGrid.innerHTML = question.answers
    .map(
      (answer, index) => `
    <button class="answer-btn" onclick="selectAnswer(${index})">${answer}</button>
  `
    )
    .join("");

  document.getElementById("nextBtn").classList.add("hidden");
}

function selectAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  userStats.totalQuestions++;

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === question.correct) btn.classList.add("correct");
    else if (index === selectedIndex && selectedIndex !== question.correct)
      btn.classList.add("incorrect");
  });

  if (selectedIndex === question.correct) {
    userStats.correctAnswers++;
    showCelebration("🎉 Benar! Hebat!");
  } else {
    showEncouragement();
  }

  setTimeout(() => {
    document.getElementById("nextBtn").classList.remove("hidden");
  }, 1000);
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function completeModule() {
  const accuracy = Math.round(
    (userStats.correctAnswers / userStats.totalQuestions) * 100
  );
  alert(`Modul selesai! 🎊\nTingkat akurasi: ${accuracy}%`);
  showSection("modules");
  updateStats();
}

// =====================
// Lain-lain
// =====================
function showSection(section, element) {
  document
    .querySelectorAll(".section, .question-area, .chat-area, .report-area")
    .forEach((el) => {
      el.classList.add("hidden");
    });
  document
    .querySelectorAll(".nav-tab")
    .forEach((tab) => tab.classList.remove("active"));

  switch (section) {
    case "modules":
      document.getElementById("modulesSection").classList.remove("hidden");
      break;
    case "chat":
      document.getElementById("chatSection").classList.remove("hidden");
      break;
    case "talents":
      document.getElementById("talentsSection").classList.remove("hidden");
      break;
    case "report":
      document.getElementById("reportSection").classList.remove("hidden");
      break;
    case "question":
      document.getElementById("questionSection").classList.remove("hidden");
      break;
  }

  if (element) element.classList.add("active");
}

function updateStats() {
  userStats.studyTime = Math.floor((Date.now() - userStats.startTime) / 60000);
  document.getElementById("totalQuestions").textContent =
    userStats.totalQuestions;
  document.getElementById("correctAnswers").textContent =
    userStats.correctAnswers;
  document.getElementById("accuracyRate").textContent =
    userStats.totalQuestions > 0
      ? Math.round(
          (userStats.correctAnswers / userStats.totalQuestions) * 100
        ) + "%"
      : "0%";
  document.getElementById("studyTime").textContent = userStats.studyTime;
}

function showCelebration(text) {
  const celebration = document.createElement("div");
  celebration.className = "celebration";
  celebration.textContent = text;
  document.body.appendChild(celebration);

  setTimeout(() => {
    if (document.body.contains(celebration))
      document.body.removeChild(celebration);
  }, 2000);
}

function showEncouragement() {
  const encouragements = [
    "💪 Hampir benar!",
    "📚 Coba lagi ya!",
    "⭐ Semangat terus!",
    "👏 Bagus sudah berusaha!",
  ];
  showCelebration(
    encouragements[Math.floor(Math.random() * encouragements.length)]
  );
}

// Debug
document.addEventListener("DOMContentLoaded", () => {
  console.log("EduPlay siap 🚀");

  // Mood Check
  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood; // ambil data-mood dari tombol
      alert(`Kamu merasa ${mood} hari ini 😊`);
    });
  });
});
