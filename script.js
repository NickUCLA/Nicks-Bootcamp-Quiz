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

var questions = [
  {
    question: "What does CSS stand for?",
    choices: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    choices: ["<ul>", "<ol>", "<li>"],
    answer: "<ul>",
  },
  // Add more questions...
];

var score = 0;
var timeLeft = 60;
var timerID;
var highScores;
var initials;
var timeoutID;

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
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
      showScore();
    }
  }, 1000);
  console.log(timeLeft);
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
    //make option to save score or go back
    postQuizElem.style.display = "block";
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

  function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;

    if (selectedAnswer === randomQuestion.answer) {
      resultElem.textContent = "Correct!";
      setTimeout(restartTimeout, 100);
      score++;
      //removes previous question choices and then gets new question
      var choices = choicesElem.getElementsByTagName("li");
      for (var i = 0; i < choices.length; i++) {
        choicesElem.removeChild(choices[i]);
      }
      getQuestion();
    } else {
      resultElem.textContent = "Incorrect!";
      setTimeout(restartTimeout, 100);
      score--;
    }
    console.log(score);
  }
}

// these functions reset the timeout if clicked more then once
function startTimeout() {
  timeoutID = setTimeout(() => {
    resultElem.textContent = "";
  }, 2000);
}
function restartTimeout() {
  clearTimeout(timeoutID);
  startTimeout();
}

function saveScore() {
  initials = inputElem.value;
  highScores = [
    { name: "John", namesScore: 25 },
    { name: "Jane", namesScore: 30 },
    { name: "Michael", namesScore: 35 },
  ];
  var highScore = {
    name: initials,
    namesScore: score,
  };
  highScores.push(highScore);

  // display scores based on highest score first
  highScores.sort(function (a, b) {
    return b.namesScore - a.namesScore;
  });

  console.log(highScores);

  initialsElem.style.display = "none";
  quizElem.style.display = "none";
  scoreBoardElem.style.display = "block";

  scoreBoard();
}

function scoreBoard() {
  highScores.sort(function (a, b) {
    return b.namesScore - a.namesScore;
  });

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
}

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("backBtn").addEventListener("click", () => {
  location.reload();
});
saveScoreBtn.addEventListener("click", () => {
  initialsElem.style.display = "block";
  saveScoreBtn.style.display = "none";
  document.getElementById("timer").style.display = "none";
});
document.getElementById("save-initial").addEventListener("click", saveScore);
