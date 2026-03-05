const trigIdentities = {
  "\\(\\sin(-x)\\)": "\\(-\\sin x\\)",
  "\\(\\cos(-x)\\)": "\\(\\cos x\\)",

  "\\(\\cos(x+y)\\)": "\\(\\cos x \\cos y - \\sin x \\sin y\\)",
  "\\(\\cos(x-y)\\)": "\\(\\cos x \\cos y + \\sin x \\sin y\\)",
  "\\(\\sin(x+y)\\)": "\\(\\sin x \\cos y + \\cos x \\sin y\\)",
  "\\(\\sin(x-y)\\)": "\\(\\sin x \\cos y - \\cos x \\sin y\\)",

  "\\(\\cos(\\frac{\\pi}{2} - x)\\)": "\\(\\sin x\\)",
  "\\(\\sin(\\frac{\\pi}{2} - x)\\)": "\\(\\cos x\\)",
  "\\(\\cos(\\pi - x)\\)": "\\(-\\cos x\\)",
  "\\(\\sin(\\pi - x)\\)": "\\(\\sin x\\)",
  "\\(\\cos(\\pi + x)\\)": "\\(-\\cos x\\)",
  "\\(\\sin(\\pi + x)\\)": "\\(-\\sin x\\)",
  "\\(\\cos(2\\pi - x)\\)": "\\(\\cos x\\)",
  "\\(\\sin(2\\pi - x)\\)": "\\(-\\sin x\\)",

  "\\(\\tan(x+y)\\)": "\\(\\frac{\\tan x + \\tan y}{1 - \\tan x \\tan y}\\)",
  "\\(\\tan(x-y)\\)": "\\(\\frac{\\tan x - \\tan y}{1 + \\tan x \\tan y}\\)",
  "\\(\\cot(x+y)\\)": "\\(\\frac{\\cot x \\cot y - 1}{\\cot x + \\cot y}\\)",
  "\\(\\cot(x-y)\\)": "\\(\\frac{\\cot x \\cot y + 1}{\\cot y - \\cot x}\\)",

  "\\(\\cos 2x\\)": [
    "\\(\\cos^2 x - \\sin^2 x\\)",
    "\\(2\\cos^2 x - 1\\)",
    "\\(1 - 2\\sin^2 x\\)",
    "\\(\\frac{1 - \\tan^2 x}{1 + \\tan^2 x}\\)"
  ],

  "\\(\\sin 2x\\)": [
    "\\(2 \\sin x \\cos x\\)",
    "\\(\\frac{2 \\tan x}{1 + \\tan^2 x}\\)"
  ],

  "\\(\\tan 2x\\)": "\\(\\frac{2 \\tan x}{1 - \\tan^2 x}\\)",

  "\\(\\sin 3x\\)": "\\(3 \\sin x - 4 \\sin^3 x\\)",
  "\\(\\cos 3x\\)": "\\(4 \\cos^3 x - 3 \\cos x\\)",
  "\\(\\tan 3x\\)": "\\(\\frac{3 \\tan x - \\tan^3 x}{1 - 3 \\tan^2 x}\\)",

  "\\(\\cos x + \\cos y\\)": "\\(2 \\cos \\frac{x+y}{2} \\cos \\frac{x-y}{2}\\)",
  "\\(\\cos x - \\cos y\\)": "\\(-2 \\sin \\frac{x+y}{2} \\sin \\frac{x-y}{2}\\)",
  "\\(\\sin x + \\sin y\\)": "\\(2 \\sin \\frac{x+y}{2} \\cos \\frac{x-y}{2}\\)",
  "\\(\\sin x - \\sin y\\)": "\\(2 \\cos \\frac{x+y}{2} \\sin \\frac{x-y}{2}\\)",

  "\\(2 \\sin A \\cos B\\)": "\\(\\sin(A+B) + \\sin(A-B)\\)",
  "\\(2 \\cos A \\cos B\\)": "\\(\\cos(A+B) + \\cos(A-B)\\)",
  "\\(-2 \\sin A \\sin B\\)": "\\(\\cos(A+B) - \\cos(A-B)\\)",

  "\\(\\sin(A+B) \\sin(A-B)\\)": "\\(\\sin^2 A - \\sin^2 B\\)",
  "\\(\\cos(A+B) \\cos(A-B)\\)": "\\(\\frac{\\cos 2A + \\cos 2B}{2}\\)"
};

const flashcard = document.getElementById("flashcard");
const answerLabel = document.getElementById("answer");
const fullListDiv = document.getElementById("fullList");

let currentLHS = "";
let currentAllRHS = [];
let questionType = "LHS";
let lastKey = "";


function getRandomKey() {
  const keys = Object.keys(trigIdentities);
  let randomKey;

  do {
    randomKey = keys[Math.floor(Math.random() * keys.length)];
  } while (randomKey === lastKey);

  lastKey = randomKey;
  return randomKey;
}


function nextanswer() {
  answerLabel.innerHTML = "";
  answerLabel.classList.remove("visible");

  const randomKey = getRandomKey();
  const value = trigIdentities[randomKey];

  currentLHS = randomKey;
  currentAllRHS = Array.isArray(value) ? value : [value];

  questionType = Math.random() < 0.5 ? "LHS" : "RHS";

  if (questionType === "LHS") {
    flashcard.innerHTML = currentLHS;
  } else {
    const randomRHS = currentAllRHS[Math.floor(Math.random() * currentAllRHS.length)];
    flashcard.innerHTML = randomRHS;
  }

  MathJax.typesetPromise();
}


function showAnswer() {
  if (questionType === "LHS") {
    answerLabel.innerHTML = currentAllRHS.join("<br><br>");
  } else {
    answerLabel.innerHTML = currentLHS;
  }

  answerLabel.classList.add("visible");
  MathJax.typesetPromise();
}


/* ---------- FIXED TOGGLE FUNCTION ---------- */

function toggleList() {

  if (!fullListDiv.classList.contains("visible")) {

    fullListDiv.innerHTML = "";

    for (const key in trigIdentities) {
      const value = trigIdentities[key];
      const rhsArray = Array.isArray(value) ? value : [value];

      rhsArray.forEach(rhs => {
        fullListDiv.innerHTML += `
          <div class="identity-item">
            ${key} = ${rhs}
          </div>
        `;
      });
    }

    fullListDiv.classList.add("visible");
    MathJax.typesetPromise();

  } else {
    fullListDiv.classList.remove("visible");
  }
}


nextanswer();