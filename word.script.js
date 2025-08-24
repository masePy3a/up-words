
const quizData = [
  { word: "book", example: "She reads a book every night.", choices: ["本", "机", "窓"], correct: "本", hintImage: "images/book.png" },
  { word: "cat", example: "The cat is sleeping on the sofa.", choices: ["犬", "猫", "鳥"], correct: "猫", hintImage: "images/cat.png" },
  { word: "chair", example: "He sat on the chair near the window.", choices: ["椅子", "机", "棚"], correct: "椅子", hintImage: "images/chair.png" },
  { word: "dog", example: "My dog loves to play fetch.", choices: ["猫", "鳥", "犬"], correct: "犬", hintImage: "images/dog.png" },
  { word: "house", example: "They live in a big house.", choices: ["車", "家", "公園"], correct: "家", hintImage: "images/house.png" },
  { word: "pen", example: "I write with a blue pen.", choices: ["鉛筆", "消しゴム", "ペン"], correct: "ペン", hintImage: "images/pen.png" },
  { word: "water", example: "Drink water to stay healthy.", choices: ["水", "ジュース", "牛乳"], correct: "水", hintImage: "images/water.png" },
  { word: "sun", example: "The sun is shining brightly today.", choices: ["月", "星", "太陽"], correct: "太陽", hintImage: "images/sun.png" },

  // 🔽 追加分
  { word: "car", example: "He drove his car to the countryside.", choices: ["車", "電車", "バス"], correct: "車", hintImage: "images/car.png" },
  { word: "apple", example: "She ate a fresh apple after lunch.", choices: ["バナナ", "リンゴ", "みかん"], correct: "リンゴ", hintImage: "images/apple.png" },
  { word: "classmate", example: "My classmate helped me with homework.", choices: ["先生", "同級生", "先輩"], correct: "同級生", hintImage: "images/classmate.png" },
  { word: "principal", example: "The principal gave a speech at the ceremony.", choices: ["校長先生", "担任", "教頭"], correct: "校長先生", hintImage: "images/principal.png" },
  { word: "club", example: "He joined the soccer club after school.", choices: ["部活", "授業", "委員会"], correct: "部活", hintImage: "images/club.png" },
  { word: "math", example: "I find math challenging but fun.", choices: ["国語", "理科", "数学"], correct: "数学", hintImage: "images/math.png" },
  { word: "station", example: "We met at the train station at 8 a.m.", choices: ["空港", "駅", "バス停"], correct: "駅", hintImage: "images/station.png" },
  { word: "refrigerator", example: "Put the milk in the refrigerator.", choices: ["冷蔵庫", "棚", "電子レンジ"], correct: "冷蔵庫", hintImage: "images/refrigerator.png" },
  { word: "ephemeral", example: "Life is ephemeral, so cherish every moment.", choices: ["永遠の", "つかの間の", "退屈な"], correct: "つかの間の", hintImage: "images/ephemeral.png" }
];

let originalQuizData = [...quizData];
let currentQuiz = 0;
let score = 0;
let wrongAnswers = [];

function loadQuiz() {
  const quiz = quizData[currentQuiz];
  document.getElementById("word").innerText = quiz.word;
  document.getElementById("example").innerText = quiz.example;
  document.getElementById("choices").innerHTML = "";

  quiz.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => handleAnswer(choice);
    document.getElementById("choices").appendChild(btn);
  });

  document.getElementById("hint").src = quiz.hintImage;
}

function handleAnswer(selected) {
  const quiz = quizData[currentQuiz];
  if (selected !== quiz.correct) {
    wrongAnswers.push(quiz);
  } else {
    score++;
  }

  currentQuiz++;
  setTimeout(() => {
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }, 500); // 自動遷移（0.5秒後）
}

function showResult() {
  let html = `<h2>終了！正解数：${score} / ${quizData.length}</h2>`;
  if (wrongAnswers.length > 0) {
    html += `<button onclick="retryWrong()">不正解のみ再チャレンジ</button>`;
  }
  html += `<button onclick="restartQuiz()">最初からやり直す</button>`;
  document.getElementById("quiz-container").innerHTML = html;
}

function retryWrong() {
  if (wrongAnswers.length === 0) return;
  quizData = [...wrongAnswers];
  currentQuiz = 0;
  score = 0;
  wrongAnswers = [];
  resetUI();
  loadQuiz();
}

function restartQuiz() {
  quizData = [...originalQuizData];
  currentQuiz = 0;
  score = 0;
  wrongAnswers = [];
  resetUI();
  loadQuiz();
}

function resetUI() {
  document.getElementById("quiz-container").innerHTML = `
    <div id="quiz-box">
      <div id="word"></div>
      <div id="example"></div>
      <div id="choices"></div>
      <img id="hint" src="" alt="ヒント画像" />
    </div>
  `;
}
function handleIncorrectAnswer() {
  document.getElementById("retryBtn").style.display = "block";
}


function checkAnswer(userAnswer, correctAnswer, word) {
  if (userAnswer !== correctAnswer) {
    incorrectWords.push(word);
    document.getElementById("retryBtn").style.display = "block";
  }
}

function retryIncorrectWords() {
  if (incorrectWords.length === 0) return;

  currentQuizWords = [...incorrectWords];
  incorrectWords = []; // 状態リセット
  startQuiz(); // クイズ再スタート
}
function retryWrong() {
  if (wrongAnswers.length === 0) return;

  quizData = [...wrongAnswers]; // 不正解のみ再出題
  currentQuiz = 0;
  score = 0;
  wrongAnswers = [];
  resetUI();
  loadQuiz();
}
