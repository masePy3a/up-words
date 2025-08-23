// 単語データ（1問分）
const quiz = {
  word: "car",
  example: "He drives a car.",
  choices: ["木", "車", "枕"],
  correct: "車"
};

let correctCount = 0;
let incorrectCount = 0;

// 選択肢判定
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

// お祝いアニメ表示
function showCelebration() {
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");
  setTimeout(() => {
    celebration.classList.add("hidden");
  }, 1000);
}