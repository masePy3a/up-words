// 単語データ（1問分）
const quiz = {
  word: "car",
  example: "He drives a car.",
  choices: ["木", "車", "枕"],
  correct: "車",
  image: "images/car_hint.png",
  wordAudio: "audio/car.mp3",
  sentenceAudio: "audio/car_sentence.mp3"
};

let correctCount = 0;
let incorrectCount = 0;

// ✅ ヒント画像表示
document.getElementById("hintImageBtn").addEventListener("click", () => {
  document.getElementById("hintImage").classList.remove("hidden");
});

// ✅ 音声再生関数
function playAudio(filePath) {
  const audio = new Audio(filePath);
  audio.play();
}

// ✅ 音声ボタン
document.getElementById("wordAudioBtn").addEventListener("click", () => {
  playAudio(quiz.wordAudio);
});
document.getElementById("sentenceAudioBtn").addEventListener("click", () => {
  playAudio(quiz.sentenceAudio);
});

// ✅ 選択肢判定
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.choice;
    if (selected === quiz.correct) {
      correctCount++;
      document.getElementById("correctCount").textContent = correctCount;
      showCelebration();
    } else {
      incorrectCount++;
      document.getElementById("incorrectCount").textContent = incorrectCount;
    }
  });
});

// ✅ お祝いアニメ表示
function showCelebration() {
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");
  setTimeout(() => {
    celebration.classList.add("hidden");
  }, 1000);
}
// 単語の音声再生
document.getElementById("wordAudioBtn").addEventListener("click", () => {
  speakText(quiz.word, "en-US");
});

// 例文の音声再生
document.getElementById("sentenceAudioBtn").addEventListener("click", () => {
  speakText(quiz.example, "en-US");
});

// 音声読み上げ関数
function speakText(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
}
let currentIndex = 0;
let currentQuiz = quizData[currentIndex];

// 表示更新関数
function loadQuiz() {
  document.getElementById("word").textContent = currentQuiz.word;
  document.getElementById("example").textContent = "Example: " + currentQuiz.example;
  document.querySelectorAll(".choice-btn").forEach((btn, i) => {
    btn.textContent = `${i + 1}. ${currentQuiz.choices[i]}`;
    btn.dataset.choice = currentQuiz.choices[i];
  });
  document.getElementById("hintImage").src = currentQuiz.hintImage;
  document.getElementById("hintImage").style.display = "none";
}
let currentIndex = 0;

function loadQuiz() {
  const quiz = quizData[currentIndex];
  document.getElementById("word").textContent = quiz.word;
  document.getElementById("example").textContent = "Example: " + quiz.example;
  document.getElementById("hintImage").src = quiz.hintImage;
  document.getElementById("hintImage").style.display = "none";

  document.querySelectorAll(".choice-btn").forEach((btn, i) => {
    btn.textContent = `${i + 1}. ${quiz.choices[i]}`;
    btn.dataset.choice = quiz.choices[i];
  });

  // 音声ボタン更新
  document.getElementById("wordAudioBtn").onclick = () => speakText(quiz.word);
  document.getElementById("sentenceAudioBtn").onclick = () => speakText(quiz.example);
}

// 初期表示
loadQuiz();

// 次へボタン処理
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuiz();
  } else {
    alert("すべての問題が終了しました！");
  }
});