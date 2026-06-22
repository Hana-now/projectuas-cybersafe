const quiz = [
{
    soal: `Pesan berikut aman atau scam?
"Selamat! Anda mendapatkan hadiah uang tunai, klik link berikut untuk klaim sekarang! bit.ly/hadiah123"`,

    pilihan: ["AMAN", "SCAM", "MUNGKIN AMAN", "TIDAK TAHU"],

    benar: "SCAM",

    feedback: {
        AMAN: "❌ Salah. Pesan yang menawarkan hadiah secara tiba-tiba dan meminta Anda mengklik tautan merupakan ciri umum penipuan online. Jangan langsung percaya pada pesan seperti ini.",
        SCAM: "✅ Benar! Pesan ini memiliki ciri-ciri scam atau phishing, seperti iming-iming hadiah, ajakan bertindak cepat, dan penggunaan tautan pendek yang menyembunyikan alamat tujuan sebenarnya.",
        MUNGKIN_AMAN: "❌ Salah. Meskipun terlihat menarik, pesan semacam ini sering digunakan pelaku untuk menipu korban. Selalu verifikasi informasi dari sumber resmi terlebih dahulu.",
        TIDAK_TAHU: "❌ Salah. Anda dapat mengenali indikasi scam dari adanya hadiah mendadak dan tautan mencurigakan. Jangan klik tautan sebelum memastikan keamanannya."
    }
},

{
    soal: `Anda menerima file bernama "Undangan_Nikah.apk" dari nomor tidak dikenal via WhatsApp.
File tersebut termasuk kategori apa?`,

    pilihan: ["AMAN", "MALWARE", "MUNGKIN AMAN", "TIDAK TAHU"],

    benar: "MALWARE",

    feedback: {
        AMAN: "❌ Salah. File APK dari nomor yang tidak dikenal sangat berisiko karena dapat berisi malware yang mencuri data atau merusak perangkat.",
        MALWARE: "✅ Benar! File APK yang dikirim oleh sumber tidak dikenal sering digunakan untuk menyebarkan malware atau aplikasi berbahaya.",
        MUNGKIN_AMAN: "❌ Salah. Tidak ada jaminan keamanan untuk file APK dari sumber yang tidak jelas. Sebaiknya hindari menginstalnya.",
        TIDAK_TAHU: "❌ Salah. File APK yang dikirim oleh nomor tidak dikenal harus dianggap berisiko sampai terbukti aman melalui sumber resmi."
    }
},

{
    soal: `Anda menerima pesan WhatsApp:
"Akun WhatsApp Anda akan dinonaktifkan. Verifikasi sekarang di wa-security-login.xyz"
Pesan ini termasuk?`,

    pilihan: ["PHISHING", "AMAN", "MUNGKIN AMAN", "TIDAK TAHU"],

    benar: "PHISHING",

    feedback: {
        PHISHING: "✅ Benar! Domain wa-security-login.xyz bukan domain resmi WhatsApp. Pesan ini bertujuan untuk mencuri data atau kredensial akun pengguna.",
        AMAN: "❌ Salah. WhatsApp tidak akan meminta verifikasi akun melalui domain yang tidak resmi. Ini merupakan indikasi phishing.",
        MUNGKIN_AMAN: "❌ Salah. Domain yang digunakan berbeda dari domain resmi WhatsApp sehingga pesan tersebut tidak dapat dianggap aman.",
        TIDAK_TAHU: "❌ Salah. Salah satu cara mengenali phishing adalah memeriksa alamat situs yang digunakan. Domain yang mencurigakan merupakan tanda bahaya."
    }
},

{
    soal: `Anda mendapat email dari "support@paypa1.com" yang meminta Anda login dan memperbarui data kartu kredit.
Ini termasuk?`,

    pilihan: ["AMAN", "PHISHING", "MUNGKIN AMAN", "TIDAK TAHU"],

    benar: "PHISHING",

    feedback: {
        PHISHING: "✅ Benar! Alamat email menggunakan teknik typosquatting, yaitu membuat alamat yang sangat mirip dengan domain asli untuk mengelabui korban.",
        AMAN: "❌ Salah. Email tersebut bukan berasal dari domain resmi PayPal. Penggunaan angka '1' menggantikan huruf 'l' merupakan trik yang sering digunakan pelaku phishing.",
        MUNGKIN_AMAN: "❌ Salah. Perbedaan satu karakter pada domain sudah cukup untuk menunjukkan bahwa email tersebut tidak berasal dari layanan resmi.",
        TIDAK_TAHU: "❌ Salah. Memeriksa alamat pengirim adalah langkah penting untuk mengidentifikasi email phishing. Email ini menunjukkan ciri-ciri penipuan."
    }
},

{
    soal: `Teman Anda mengirim pesan:
"Bro, download app ini buat nonton film gratis, aku udah pakai aman kok"
disertai link ke situs tidak dikenal.
Apa yang sebaiknya Anda lakukan?`,

    pilihan: [
        "LANGSUNG DOWNLOAD",
        "TOLAK DAN ABAIKAN LINK",
        "DOWNLOAD ASAL TIDAK BAYAR",
        "MINTA TEMAN INSTALL DULU"
    ],

    benar: "TOLAK DAN ABAIKAN LINK",

    feedback: {
        LANGSUNG_DOWNLOAD: "❌ Salah. Akun teman bisa saja diretas atau digunakan pelaku untuk menyebarkan malware.",
        TOLAK_DAN_ABAIKAN_LINK: "✅ Benar! Link tidak dikenal berpotensi berbahaya.",
        DOWNLOAD_ASAL_TIDAK_BAYAR: "❌ Salah. Malware bisa tetap ada walaupun gratis.",
        MINTA_TEMAN_INSTALL_DULU: "❌ Salah. Tidak ada jaminan aman."
    }
}
];

let current = 0;
let skor = 0;

// ================= SHUFFLE =================
function shuffleQuiz() {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
}

// ================= PROGRESS =================
function updateProgress() {
    const progress = ((current + 1) / quiz.length) * 100;

    document.getElementById("progressText").innerText =
        `Soal ${current + 1} dari ${quiz.length}`;

    document.getElementById("progressPercent").innerText =
        Math.round(progress) + "%";

    document.getElementById("progressFill").style.width =
        progress + "%";
}

// ================= LOAD =================
function loadQuestion() {

    document.getElementById("nomor").innerText =
        "Pertanyaan " + (current + 1);

    document.getElementById("soal").innerText =
        quiz[current].soal;

    document.getElementById("feedback").innerText =
        "FEEDBACK : Jawaban Anda akan muncul di sini...";

    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("skorBox").innerText =
        "Skor : " + skor + "/100";

    const jawaban = document.getElementById("jawaban");
    jawaban.innerHTML = "";

    quiz[current].pilihan.forEach(p => {
        const btn = document.createElement("button");
        btn.innerText = p;
        btn.onclick = () => cekJawaban(btn, p);
        jawaban.appendChild(btn);
    });

    updateProgress();
}

// ================= CEK =================
function cekJawaban(button, pilihan) {

    const data = quiz[current];

    const allBtn = document.querySelectorAll(".answer-box button");

    allBtn.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === data.benar) {
            btn.classList.add("benar");
        }
    });

    let key = pilihan.replaceAll(" ", "_");
    let feedback = data.feedback[key];

    if (pilihan === data.benar) {
        skor += 20;
    } else {
        button.classList.add("salah");
    }

    document.getElementById("feedback").innerText =
        "FEEDBACK : " + feedback;

    document.getElementById("skorBox").innerText =
        "Skor : " + skor + "/100";

    document.getElementById("nextBtn").style.display = "inline-block";
}

// ================= NEXT =================
function nextQuestion() {
    current++;

    if (current < quiz.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// ================= RESULT =================
function showResult() {

    // HILANGKAN NEXT (WAJIB)
    document.getElementById("nextBtn").style.display = "none";

    document.querySelector(".quiz-content").innerHTML = `
        <div class="result-box">

            <h1>QUIZ SELESAI</h1>

            <div class="score-circle">${skor}</div>

            <h2>Skor Akhir</h2>

            <p>
                ${
                    skor >= 80 ? "Sangat baik!"
                    : skor >= 60 ? "Cukup baik!"
                    : "Perlu belajar lagi!"
                }
            </p>

            <button class="restart-btn" onclick="restartQuiz()">
                🔄 Ulangi Quiz
            </button>

        </div>
    `;

    document.getElementById("feedback").style.display = "none";
}

// ================= RESTART FIX TOTAL =================
function restartQuiz() {

    current = 0;
    skor = 0;

    shuffleQuiz();

    // kembalikan tampilan quiz TANPA innerHTML destroy
    document.querySelector(".quiz-content").innerHTML = `
        <div class="question-box">

            <div class="question-header">
                <p id="nomor"></p>
                <div id="skorBox" class="skor-box">0/100</div>
            </div>

            <br>

            <p id="soal"></p>

            <div class="progress-box">
                <div class="progress-top">
                    <span id="progressText"></span>
                    <span id="progressPercent">0%</span>
                </div>

                <div class="progress-bar">
                    <div id="progressFill"></div>
                </div>
            </div>

        </div>

        <div class="answer-box" id="jawaban"></div>

        <div class="next-container">
            <button id="nextBtn" onclick="nextQuestion()" style="display:none;">
                Selanjutnya →
            </button>
        </div>
    `;

    document.getElementById("feedback").style.display = "block";

    loadQuestion();
}

// ================= START =================
shuffleQuiz();
loadQuestion();