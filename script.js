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
          solution:
            "Tip: Bayangkan apel di toko buah, warnanya sama dengan darah!",
        },
        {
          q: "Warna langit cerah adalah...",
          answers: ["Merah", "Biru", "Hijau", "Kuning"],
          correct: 1,
          solution:
            "Tip: Lihat ke atas saat cuaca cerah, warnanya seperti laut!",
        },
        {
          q: "Warna daun adalah...",
          answers: ["Merah", "Biru", "Hijau", "Kuning"],
          correct: 2,
          solution: "Tip: Seperti rumput di taman atau sayur bayam!",
        },
        {
          q: "Warna matahari adalah...",
          answers: ["Ungu", "Biru", "Hijau", "Kuning"],
          correct: 3,
          solution: "Tip: Seperti warna pisang atau telur ayam!",
        },
        {
          q: "Warna wortel adalah...",
          answers: ["Oranye", "Biru", "Hijau", "Ungu"],
          correct: 0,
          solution: "Tip: Campuran merah dan kuning membuat warna ini!",
        },
        {
          q: "Warna susu adalah...",
          answers: ["Hitam", "Putih", "Hijau", "Merah"],
          correct: 1,
          solution: "Tip: Seperti warna awan atau kertas bersih!",
        },
      ],
      numbers: [
        {
          q: "1 + 1 = ?",
          answers: ["1", "2", "3", "4"],
          correct: 1,
          solution: "Tip: Hitung dengan jari! Angkat 1 jari + 1 jari = 2 jari!",
        },
        {
          q: "Berapa jari di satu tangan?",
          answers: ["3", "4", "5", "6"],
          correct: 2,
          solution:
            "Tip: Lihat tanganmu! Hitung: jempol, telunjuk, tengah, manis, kelingking = 5!",
        },
        {
          q: "3 + 2 = ?",
          answers: ["4", "5", "6", "7"],
          correct: 1,
          solution: "Tip: Mulai dari 3, lalu tambah 2: 3...4...5!",
        },
        {
          q: "5 - 3 = ?",
          answers: ["1", "2", "3", "4"],
          correct: 1,
          solution: "Tip: Punya 5 permen, makan 3, sisa berapa? 5-1-1-1 = 2!",
        },
        {
          q: "Angka setelah 7 adalah...",
          answers: ["6", "8", "9", "10"],
          correct: 1,
          solution: "Tip: Hitung berurutan: 1,2,3,4,5,6,7... berikutnya 8!",
        },
        {
          q: "2 + 3 = ?",
          answers: ["4", "5", "6", "7"],
          correct: 1,
          solution: "Tip: Hitung pakai jari! 2 jari + 3 jari = 5 jari total!",
        },
      ],
      shapes: [
        {
          q: "Bola memiliki bentuk...",
          answers: ["Kotak", "Bulat", "Segitiga", "Persegi"],
          correct: 1,
          solution:
            "Tip: Bola menggelinding karena tidak punya sudut, bentuknya bulat!",
        },
        {
          q: "Dadu memiliki bentuk...",
          answers: ["Kotak", "Bulat", "Segitiga", "Oval"],
          correct: 0,
          solution: "Tip: Dadu punya 6 sisi yang sama, bentuknya kotak/kubus!",
        },
        {
          q: "Atap rumah biasanya berbentuk...",
          answers: ["Bulat", "Kotak", "Segitiga", "Oval"],
          correct: 2,
          solution:
            "Tip: Atap runcing seperti topi ulang tahun, berbentuk segitiga!",
        },
        {
          q: "Roda sepeda berbentuk...",
          answers: ["Kotak", "Bulat", "Segitiga", "Persegi"],
          correct: 1,
          solution: "Tip: Roda bisa berputar karena bulat, tidak ada sudutnya!",
        },
        {
          q: "Papan catur berbentuk...",
          answers: ["Bulat", "Segitiga", "Persegi", "Oval"],
          correct: 2,
          solution:
            "Tip: Papan catur punya 4 sisi sama panjang, berbentuk persegi!",
        },
      ],
      animals: [
        {
          q: "Hewan yang bisa terbang adalah...",
          answers: ["Ikan", "Burung", "Kucing", "Anjing"],
          correct: 1,
          solution: "Tip: Yang punya sayap dan bisa di langit adalah burung!",
        },
        {
          q: "Hewan yang hidup di air adalah...",
          answers: ["Ikan", "Ayam", "Sapi", "Kelinci"],
          correct: 0,
          solution: "Tip: Yang bisa berenang dan bernapas di air adalah ikan!",
        },
        {
          q: "Suara kucing adalah...",
          answers: ["Guk guk", "Meong", "Moo", "Kukuruyuk"],
          correct: 1,
          solution: "Tip: Kucing bilang 'meong' saat minta makan!",
        },
        {
          q: "Hewan terbesar di darat adalah...",
          answers: ["Kucing", "Anjing", "Gajah", "Tikus"],
          correct: 2,
          solution:
            "Tip: Yang punya belalai panjang dan badan besar adalah gajah!",
        },
        {
          q: "Ayam jantan bersuara...",
          answers: ["Meong", "Guk guk", "Kukuruyuk", "Moo"],
          correct: 2,
          solution:
            "Tip: Ayam jantan membangunkan kita pagi-pagi dengan 'kukuruyuk'!",
        },
      ],
      letters: [
        {
          q: "Huruf pertama dalam alfabet adalah...",
          answers: ["B", "A", "C", "D"],
          correct: 1,
          solution: "Tip: Ingat lagu ABC! A-B-C-D... yang pertama adalah A!",
        },
        {
          q: "Kata 'BOLA' dimulai dengan huruf...",
          answers: ["A", "B", "C", "D"],
          correct: 1,
          solution: "Tip: Baca pelan-pelan: B-O-L-A, huruf pertamanya B!",
        },
        {
          q: "Berapa huruf dalam kata 'MAMA'?",
          answers: ["2", "3", "4", "5"],
          correct: 2,
          solution: "Tip: Hitung satu-satu: M-A-M-A = 4 huruf!",
        },
        {
          q: "Kata 'KUCING' dimulai dengan huruf...",
          answers: ["K", "U", "C", "I"],
          correct: 0,
          solution: "Tip: Baca pelan: K-U-C-I-N-G, huruf pertamanya K!",
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
      {
        id: "indonesian",
        name: "Bahasa Indonesia",
        icon: "📚",
        desc: "Tata bahasa dan sastra",
      },
      {
        id: "social",
        name: "IPS",
        icon: "🗺️",
        desc: "Sejarah dan geografi",
      },
    ],
    questions: {
      math: [
        {
          q: "2x + 5 = 11, nilai x adalah...",
          answers: ["2", "3", "4", "5"],
          correct: 1,
          solution: "Cara cepat: 2x = 11-5 = 6, jadi x = 6÷2 = 3",
        },
        {
          q: "Akar dari 144 adalah...",
          answers: ["10", "11", "12", "13"],
          correct: 2,
          solution: "Tip: Ingat 12×12 = 144, jadi √144 = 12",
        },
        {
          q: "25% dari 80 adalah...",
          answers: ["15", "20", "25", "30"],
          correct: 1,
          solution: "Cara cepat: 25% = 1/4, jadi 80÷4 = 20",
        },
        {
          q: "(x+3)(x-3) = ?",
          answers: ["x²+9", "x²-9", "x²+6", "x²-6"],
          correct: 1,
          solution: "Rumus: (a+b)(a-b) = a²-b², jadi x²-3² = x²-9",
        },
        {
          q: "Jika 3x = 21, maka x = ?",
          answers: ["6", "7", "8", "9"],
          correct: 1,
          solution: "Cara cepat: x = 21÷3 = 7",
        },
        {
          q: "Luas lingkaran dengan jari-jari 7 cm adalah... (π=22/7)",
          answers: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
          correct: 0,
          solution: "Rumus: π×r² = 22/7×7² = 22/7×49 = 22×7 = 154 cm²",
        },
        {
          q: "Hasil dari 15² - 14² adalah...",
          answers: ["29", "30", "31", "32"],
          correct: 0,
          solution: "Rumus: a²-b² = (a+b)(a-b) = (15+14)(15-14) = 29×1 = 29",
        },
        {
          q: "Nilai dari 2⁵ adalah...",
          answers: ["16", "25", "32", "64"],
          correct: 2,
          solution: "Cara cepat: 2⁵ = 2×2×2×2×2 = 32",
        },
      ],
      science: [
        {
          q: "Rumus kimia air adalah...",
          answers: ["H2O", "CO2", "NaCl", "CH4"],
          correct: 0,
          solution: "Ingat: H2O = 2 atom Hidrogen + 1 atom Oksigen",
        },
        {
          q: "Proses fotosintesis terjadi pada...",
          answers: ["Akar", "Batang", "Daun", "Bunga"],
          correct: 2,
          solution: "Daun memiliki klorofil (zat hijau) untuk fotosintesis",
        },
        {
          q: "Kecepatan cahaya dalam vakum adalah...",
          answers: [
            "300.000 km/s",
            "150.000 km/s",
            "450.000 km/s",
            "600.000 km/s",
          ],
          correct: 0,
          solution: "Konstanta fisika: c = 3×10⁸ m/s = 300.000 km/s",
        },
        {
          q: "Organ yang menghasilkan insulin adalah...",
          answers: ["Hati", "Ginjal", "Pankreas", "Jantung"],
          correct: 2,
          solution: "Pankreas menghasilkan insulin untuk mengatur gula darah",
        },
        {
          q: "Gas yang paling banyak di atmosfer adalah...",
          answers: ["Oksigen", "Nitrogen", "Karbon dioksida", "Argon"],
          correct: 1,
          solution: "Atmosfer: 78% Nitrogen, 21% Oksigen, 1% gas lain",
        },
        {
          q: "Satuan gaya dalam SI adalah...",
          answers: ["Joule", "Newton", "Watt", "Pascal"],
          correct: 1,
          solution: "Newton (N) = kg×m/s² (massa×percepatan)",
        },
        {
          q: "Planet terdekat dengan Matahari adalah...",
          answers: ["Venus", "Merkurius", "Bumi", "Mars"],
          correct: 1,
          solution: "Urutan dari Matahari: Merkurius, Venus, Bumi, Mars...",
        },
      ],
      indonesian: [
        {
          q: "Kata benda dalam kalimat 'Adik membaca buku' adalah...",
          answers: ["Adik", "membaca", "buku", "Adik dan buku"],
          correct: 3,
          solution: "'Adik' (orang) dan 'buku' (benda) adalah kata benda",
        },
        {
          q: "Imbuhan 'me-' pada kata 'menulis' berfungsi sebagai...",
          answers: ["Awalan", "Akhiran", "Sisipan", "Gabungan"],
          correct: 0,
          solution: "'me-' di awal kata = awalan/prefiks",
        },
        {
          q: "Antonim dari kata 'tinggi' adalah...",
          answers: ["Besar", "Pendek", "Kecil", "Rendah"],
          correct: 3,
          solution: "Tinggi ↔ Rendah (berlawanan makna untuk posisi vertikal)",
        },
        {
          q: "Kalimat yang menggunakan majas hiperbola adalah...",
          answers: [
            "Bunga mawar merah",
            "Suaranya menggelegar",
            "Dia tinggi sekali",
            "Airnya jernih",
          ],
          correct: 1,
          solution:
            "'Menggelegar' = berlebihan, suara tidak bisa benar-benar menggelegar",
        },
      ],
      social: [
        {
          q: "Proklamasi kemerdekaan Indonesia dibacakan tanggal...",
          answers: [
            "16 Agustus 1945",
            "17 Agustus 1945",
            "18 Agustus 1945",
            "19 Agustus 1945",
          ],
          correct: 1,
          solution: "Tanggal bersejarah: 17 Agustus 1945 (hari kemerdekaan)",
        },
        {
          q: "Presiden pertama Indonesia adalah...",
          answers: ["Soeharto", "Soekarno", "Habibie", "Megawati"],
          correct: 1,
          solution: "Soekarno = Bapak Proklamator & Presiden RI ke-1",
        },
        {
          q: "Benua terbesar di dunia adalah...",
          answers: ["Afrika", "Amerika", "Asia", "Eropa"],
          correct: 2,
          solution: "Asia = benua terbesar (luas & populasi)",
        },
        {
          q: "Negara dengan jumlah penduduk terbanyak adalah...",
          answers: ["India", "China", "Amerika", "Indonesia"],
          correct: 1,
          solution: "China > India > Amerika > Indonesia (urutan populasi)",
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
      {
        id: "finance",
        name: "Keuangan",
        icon: "💰",
        desc: "Investasi dan Perencanaan Keuangan",
      },
      {
        id: "technology",
        name: "Teknologi",
        icon: "💻",
        desc: "Pemrograman dan Digital",
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
          solution: "Silogisme: A⊆B dan B⊆C maka A⊆C (transitif)",
        },
        {
          q: "Deret: 2, 6, 18, 54, ... Angka berikutnya adalah?",
          answers: ["108", "162", "216", "270"],
          correct: 1,
          solution: "Pola: ×3 setiap langkah. 54×3 = 162",
        },
        {
          q: "Jika hari ini Selasa, 100 hari lagi hari apa?",
          answers: ["Senin", "Selasa", "Rabu", "Kamis"],
          correct: 3,
          solution: "100÷7 = 14 sisa 2. Selasa+2 hari = Kamis",
        },
        {
          q: "Dalam kotak ada 5 bola merah, 3 bola biru. Peluang ambil bola merah?",
          answers: ["3/8", "5/8", "3/5", "5/3"],
          correct: 1,
          solution: "P(merah) = jumlah merah/total = 5/(5+3) = 5/8",
        },
        {
          q: "Jika p→q benar dan q salah, maka p adalah...",
          answers: [
            "Benar",
            "Salah",
            "Tidak dapat ditentukan",
            "Benar dan salah",
          ],
          correct: 1,
          solution:
            "Modus tollens: jika p→q benar dan q salah, maka p pasti salah",
        },
      ],
      management: [
        {
          q: "Teori manajemen yang menekankan efisiensi kerja adalah...",
          answers: [
            "Scientific Management",
            "Human Relations",
            "Contingency",
            "Systems",
          ],
          correct: 0,
          solution:
            "Frederick Taylor's Scientific Management fokus pada efisiensi",
        },
        {
          q: "SMART goals dalam manajemen artinya...",
          answers: [
            "Simple, Measurable, Achievable, Relevant, Time-bound",
            "Specific, Measurable, Achievable, Relevant, Time-bound",
            "Strategic, Meaningful, Achievable, Realistic, Timely",
            "Specific, Meaningful, Appropriate, Relevant, Time-bound",
          ],
          correct: 1,
          solution:
            "SMART = Specific, Measurable, Achievable, Relevant, Time-bound",
        },
        {
          q: "Span of control yang ideal untuk manajer adalah...",
          answers: ["3-6 orang", "5-10 orang", "10-15 orang", "Tidak terbatas"],
          correct: 1,
          solution:
            "Penelitian menunjukkan 5-10 bawahan optimal untuk kontrol efektif",
        },
        {
          q: "Gaya kepemimpinan yang memberikan kebebasan penuh pada bawahan disebut...",
          answers: [
            "Autocratic",
            "Democratic",
            "Laissez-faire",
            "Transformational",
          ],
          correct: 2,
          solution:
            "Laissez-faire = 'biarkan saja', memberikan kebebasan penuh",
        },
      ],
      finance: [
        {
          q: "Jika investasi Rp10 juta dengan bunga 12%/tahun, nilai akhir setelah 2 tahun (bunga majemuk)?",
          answers: [
            "Rp12,54 juta",
            "Rp12,44 juta",
            "Rp12,40 juta",
            "Rp12,24 juta",
          ],
          correct: 1,
          solution: "FV = PV(1+r)ⁿ = 10(1.12)² = 10×1.2544 = 12,544 juta",
        },
        {
          q: "Rasio keuangan untuk mengukur likuiditas perusahaan adalah...",
          answers: [
            "ROE",
            "Current Ratio",
            "Debt to Equity",
            "Price Earning Ratio",
          ],
          correct: 1,
          solution:
            "Current Ratio = Aset Lancar/Utang Lancar (mengukur likuiditas)",
        },
        {
          q: "Diversifikasi portofolio bertujuan untuk...",
          answers: [
            "Meningkatkan return",
            "Mengurangi risiko",
            "Mempercepat likuiditas",
            "Mengurangi pajak",
          ],
          correct: 1,
          solution:
            "'Don't put all eggs in one basket' - diversifikasi mengurangi risiko",
        },
        {
          q: "NPV positif pada proyek investasi berarti...",
          answers: [
            "Proyek rugi",
            "Proyek menguntungkan",
            "Proyek impas",
            "Tidak dapat ditentukan",
          ],
          correct: 1,
          solution:
            "NPV > 0 = Present Value cash inflow > outflow = menguntungkan",
        },
      ],
      technology: [
        {
          q: "Dalam pemrograman, Big O notation O(n²) menunjukkan...",
          answers: [
            "Kompleksitas konstan",
            "Kompleksitas linear",
            "Kompleksitas kuadratik",
            "Kompleksitas eksponensial",
          ],
          correct: 2,
          solution:
            "O(n²) = kuadratik, waktu eksekusi berbanding kuadrat dengan input",
        },
        {
          q: "Database normalization bertujuan untuk...",
          answers: [
            "Mempercepat query",
            "Mengurangi redundansi data",
            "Meningkatkan keamanan",
            "Menghemat storage",
          ],
          correct: 1,
          solution:
            "Normalisasi menghilangkan duplikasi data dan anomali update",
        },
        {
          q: "HTTP status code 404 berarti...",
          answers: ["Server error", "Not found", "Unauthorized", "Bad request"],
          correct: 1,
          solution: "404 = Not Found (halaman/resource tidak ditemukan)",
        },
        {
          q: "Dalam agile development, sprint biasanya berlangsung...",
          answers: ["1-2 minggu", "2-4 minggu", "1-2 bulan", "3-6 bulan"],
          correct: 1,
          solution: "Sprint standar = 2-4 minggu untuk iterasi pengembangan",
        },
      ],
    },
  },
};
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
    {
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
    };
}

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
    alert("soal ini sedang dalam pengembangan atau sedang di buat! 🚧");
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
