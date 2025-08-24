// 単語データ（1問分）
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

// ✅ 言語自動判定関数
function detectLang(text) {
  return /[a-zA-Z]/.test(text) ? "en-US" : "ja-JP";
}

// ✅ 音声読み上げ関数（TTS）
function speakText(text) {
  const lang = detectLang(text);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// ✅ 音声ファイル再生関数（MP3）
function playAudio(filePath) {
  const audio = new Audio(filePath);
  audio.play();
}

// ✅ お祝いアニメ表示
function showCelebration() {
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");
  setTimeout(() => {
    celebration.classList.add("hidden");
  }, 1000);
}

// ✅ ヒント画像表示
document.getElementById("hintBtn").addEventListener("click", () => {
  const img = document.getElementById("hintImage");
  img.style.display = (img.style.display === "none" || img.style.display === "") ? "block" : "none";
});

// ✅ 選択肢判定
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.choice;
    const quiz = quizData[currentIndex];
    if (selected === quiz.correct) {
      correctCount++;
      document.getElementById("correctCount").textContent = correctCount;
      showCelebration();
      btn.style.backgroundColor = "#c8f7c5";
    } else {
      incorrectCount++;
      document.getElementById("incorrectCount").textContent = incorrectCount;
      btn.style.backgroundColor = "#f7c5c5";
    }
    document.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);
  });
});

// ✅ 表示更新関数
function loadQuiz() {
  const quiz = quizData[currentIndex];
  document.getElementById("word").textContent = quiz.word;
  document.getElementById("example").textContent = "Example: " + quiz.example;
  document.getElementById("hintImage").src = quiz.hintImage;
  document.getElementById("hintImage").style.display = "none";

  document.querySelectorAll(".choice-btn").forEach((btn, i) => {
    btn.textContent = `${i + 1}. ${quiz.choices[i]}`;
    btn.dataset.choice = quiz.choices[i];
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });

  // ✅ 音声ボタン更新（TTS）
  document.getElementById("wordAudioBtn").onclick = () => speakText(quiz.word);
  document.getElementById("sentenceAudioBtn").onclick = () => speakText(quiz.example);

  // ✅ 音声ファイル再生（MP3がある場合）
  // document.getElementById("wordAudioBtn").onclick = () => playAudio(quiz.wordAudio);
  // document.getElementById("sentenceAudioBtn").onclick = () => playAudio(quiz.sentenceAudio);

  document.getElementById("celebration").classList.add("hidden");
}

// ✅ 次へボタン処理
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuiz();
  } else {
    alert("すべての問題が終了しました！");
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById("correctCount").textContent = "0";
    document.getElementById("incorrectCount").textContent = "0";
    loadQuiz();
  }
});

// ✅ 初期表示
loadQuiz();