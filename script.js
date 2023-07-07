var startBtnElem = document.getElementById("startBtn");
var questionElem = document.getElementById("question");
var choicesElem = document.getElementById("choices");
var resultElem = document.getElementById("result");
var timer = document.getElementById("time");
var scoreElem = document.getElementById("score");
var messageElem = document.getElementById("message");
var postQuizElem = document.getElementById("post-quiz");
var inputElem = document.getElementById("score-input");
var initialsElem = document.getElementById("initials");
var saveScoreBtn = document.getElementById("saveBtn");
var scoreOl = document.getElementById("score-ol");
var scoreBoardElem = document.getElementById("score-board");
var quizElem = document.getElementById("quiz");
var backBtnElem = document.getElementById("backBtn");
var backBtnContainerElem = document.getElementById("back-btn-container");

var questions = [
  {
    question: "What does CSS stand for?",
    choices: [
      "1. Creative Style Sheets",
      "2. Cascading Style Sheets",
      "3. Computer Style Sheets",
      "4. Complex Style Sheets",
    ],
    answer: "2. Cascading Style Sheets",
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    choices: ["1. <ul>", "2. <ol>", "3. <li>", "4. <ui>"],
    answer: "1. <ul>",
  },
  {
    question: "JavaScript: What does the 'typeof' operator return?",
    choices: ["1. string", "2. number", "3. boolean", "4. undefined"],
    answer: "1. string",
  },
  {
    question: "JavaScript: How do you check if a variable is an array?",
    choices: [
      "1. Array.isArray()",
      "2. typeof",
      "3. instanceof",
      "4. Array.prototype",
    ],
    answer: "1. Array.isArray()",
  },
  {
    question: "CSS: Which property is used to change the text color?",
    choices: [
      "1. background-color",
      "2. text-color",
      "3. color",
      "4. font-color",
    ],
    answer: "3. color",
  },
  {
    question:
      "HTML: What is the correct HTML element for inserting a line break?",
    choices: ["1. <br>", "2. <break>", "3. <lb>", "4. <line>"],
    answer: "1. <br>",
  },
  {
    question:
      "HTML: Which attribute is used to specify a unique identifier for an element?",
    choices: ["1. class", "2. id", "3. name", "4. data-id"],
    answer: "2. id",
  },
  {
    question: "JavaScript: What is the result of the expression '3' + 2?",
    choices: ["1. '5'", "2. '32'", "3. 5", "4. NaN"],
    answer: "2. '32'",
  },
  {
    question: "JavaScript: How do you convert a string to lowercase?",
    choices: [
      "1. toLowerCase()",
      "2. toLower()",
      "3. lowerCase()",
      "4. convertToLower()",
    ],
    answer: "1. toLowerCase()",
  },
  {
    question: "CSS: How do you select an element with a specific class?",
    choices: ["1. .class", "2. #class", "3. element.class", "4. element#class"],
    answer: "1. .class",
  },
  {
    question:
      "CSS: How do you specify an external style sheet for an HTML document?",
    choices: ["1. <stylesheet>", "2. <style>", "3. <css>", "4. <link>"],
    answer: "4. <link>",
  },
  {
    question: "JavaScript: What is the result of the expression '5' == 5?",
    choices: ["1. true", "2. false", "3. undefined", "4. NaN"],
    answer: "1. true",
  },
  {
    question:
      "JavaScript: Which function is used to remove whitespace from both ends of a string?",
    choices: [
      "1. trim()",
      "2. removeWhitespace()",
      "3. strip()",
      "4. cleanString()",
    ],
    answer: "1. trim()",
  },
  {
    question: "HTML: What is the correct HTML element for inserting an image?",
    choices: ["1. <img>", "2. <image>", "3. <picture>", "4. <imgsrc>"],
    answer: "1. <img>",
  },
  {
    question: "CSS: How do you specify the font family for an element?",
    choices: [
      "1. font-family",
      "2. text-font",
      "3. font-style",
      "4. font-family-style",
    ],
    answer: "1. font-family",
  },
];

var score = 0;
var timeLeft = 120;
var timerID;
var highScores = [
  { name: "JW", namesScore: 25 },
  { name: "TA", namesScore: 30 },
  { name: "CJ", namesScore: 35 },
];
var initials;
var timeoutID;

// Starts the timer, hides start button and displays questions
function startQuiz() {
  startBtnElem.style.display = "none";
  quizElem.style.display = "block";
  getQuestion();
  startTimer();
}

function startTimer() {
  timer.textContent = timeLeft;
  timerID = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerID);
      score += timeLeft;
      // ends quiz by setting questions to 0 then calling getQuestion
      questions.length = 0;
      getQuestion();
    }
  }, 1000);
  return timerID;
}

function getQuestion() {
  // clears previous question html
  questionElem.innerHTML = "";
  choicesElem.innerHTML = "";

  //stops timer when questions run out and makes post quiz html
  if (questions.length === 0) {
    clearInterval(timerID);
    score += timeLeft;
    messageElem.textContent = "All Done!";
    scoreElem.textContent = "Your final score is:" + score;
    backBtnContainerElem.style.display = "block";
    postQuizElem.style.display = "block";
    resultElem.style.border = "none";
    return;
  }

  //selects random question and saves it too var
  randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  questionElem.textContent = randomQuestion.question;
  //creates li's for each of the questions choices
  for (var i = 0; i < randomQuestion.choices.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = randomQuestion.choices[i];
    choice.onclick = checkAnswer;
    choicesElem.appendChild(choice);
  }
  //takes the randomQuestion out of array with splice
  questionToRemove = questions.indexOf(randomQuestion);

  if (questionToRemove !== -1) {
    questions.splice(questionToRemove, 1);
  }

  // checks the answer and displays next question if answered correct
  function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;
    if (selectedAnswer === randomQuestion.answer) {
      resultElem.textContent = "Correct!";
      setTimeout(restartTimeout, 100);
      //removes previous question choices and then gets new question
      var choices = choicesElem.getElementsByTagName("li");
      for (var i = 0; i < choices.length; i++) {
        choicesElem.removeChild(choices[i]);
      }
      getQuestion();
    } else {
      resultElem.textContent = "Incorrect!";
      setTimeout(restartTimeout, 100);
      score -= 5;
    }
  }
}

// these functions reset the timeout if clicked more then once
function startTimeout() {
  timeoutID = setTimeout(() => {
    resultElem.textContent = "";
  }, 1300);
}
function restartTimeout() {
  clearTimeout(timeoutID);
  startTimeout();
}

// gets initials and score from input and saves them to storage then displays scoreboard
function saveScore() {
  loadHighScores();
  initials = inputElem.value;

  if (("Initials:", initials)) {
    var highScore = {
      name: initials,
      namesScore: score,
    };
    highScores.push(highScore);
  }
  // display scores based on highest score first
  highScores.sort(function (a, b) {
    return b.namesScore - a.namesScore;
  });

  localStorage.setItem("highScores", JSON.stringify(highScores));

  initialsElem.style.display = "none";
  quizElem.style.display = "none";
  scoreBoardElem.style.display = "block";
  isScoreboardShown = false;
  clearScoreboard();
  scoreBoard();
}

var isScoreboardShown = false;
// creates the score board elem
function scoreBoard() {
  if (isScoreboardShown) {
    return; // Don't show the scoreboard again if it's already displayed
  }
  loadHighScores();

  for (var i = 0; i < 10 && i < highScores.length; i++) {
    var people = highScores[i];

    var scoreList = document.createElement("li");

    var nameSpan = document.createElement("span");
    nameSpan.textContent = people.name;
    nameSpan.classList.add("name-span");

    var scoreSpan = document.createElement("span");
    scoreSpan.textContent = people.namesScore;
    scoreSpan.classList.add("score-span");

    scoreList.appendChild(nameSpan);
    scoreList.appendChild(scoreSpan);
    scoreOl.appendChild(scoreList);
  }
  isScoreboardShown = true;
}

function loadHighScores() {
  var loadScoreBoard = JSON.parse(localStorage.getItem("highScores"));
  if (loadScoreBoard !== null) {
    highScores = loadScoreBoard;
  }
}

function clearScoreboard() {
  scoreOl.innerHTML = ""; // Remove all child elements of the scoreboard element
}

startBtnElem.addEventListener("click", startQuiz);
backBtnElem.addEventListener("click", () => {
  location.reload();
});
saveScoreBtn.addEventListener("click", () => {
  initialsElem.style.display = "block";
  saveScoreBtn.style.display = "none";
  document.getElementById("timer").style.display = "none";
});
document
  .getElementById("score-input")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      saveScore();
    }
  });
document.getElementById("save-initial").addEventListener("click", saveScore);
document.getElementById("view-highscores").addEventListener("click", () => {
  startBtnElem.style.display = "none";
  scoreBoardElem.style.display = "block";
  backBtnContainerElem.style.display = "block";
  scoreBoard();
});
