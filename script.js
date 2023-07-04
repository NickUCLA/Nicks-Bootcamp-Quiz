var questionElem = document.getElementById("question");
var choicesElem = document.getElementById("choices");
var resultElem = document.getElementById("result");
var scoreElem = document.getElementById("score");

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

var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timer;

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  getQuestion();
  startTimer();
}

function getQuestion() {
  randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  questionElem.textContent = randomQuestion.question;

  for (var i = 0; i < randomQuestion.choices.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = randomQuestion.choices[i];
    choice.onclick = checkAnswer;
    choicesElem.appendChild(choice);
  }
  //take randomQuestion out of questions array
  questionToRemove = questions.indexOf(randomQuestion);

  if (questionToRemove !== -1) {
    questions.splice(questionToRemove, 1);
  }
  return questions, randomQuestion;
}

function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  if (selectedAnswer === randomQuestion.answer) {
    resultElem.textContent = "Correct!";
    score++;
    getQuestion();
  } else {
    resultElem.textContent = "Incorrect!";
    score--;
  }
  console.log(score);
}

document.getElementById("startBtn").addEventListener("click", startQuiz);
