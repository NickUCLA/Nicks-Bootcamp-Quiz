var questionElem = document.getElementById("question");
var choicesElem = document.getElementById("choices");
var resultElem = document.getElementById("result");
var timer = document.getElementById("time");
var scoreElem = document.getElementById("score");
var messageElem = document.getElementById("message");

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

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
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
  questionElem.innerHTML = "";
  choicesElem.innerHTML = "";

  //need to stop timer when questions run out.
  if (questions.length === 0) {
    clearInterval(timerID);
    score += timeLeft;
    messageElem.textContent = "All Done!";
    scoreElem.textContent = "Your final score is:" + score;
    //make option to save score or go back
    return;
  }

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
  } else {
    clearInterval(timerID);
    //show score
  }

  function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;

    if (selectedAnswer === randomQuestion.answer) {
      resultElem.textContent = "Correct!";
      setTimeout(restartTimeout, 100);
      score++;
      //remove previous question
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

var timeoutID;
function startTimeout() {
  timeoutID = setTimeout(() => {
    resultElem.textContent = "";
  }, 2000);
}
// these functions reset the timeout if clicked more then once
function restartTimeout() {
  clearTimeout(timeoutID);
  startTimeout();
}

document.getElementById("startBtn").addEventListener("click", startQuiz);
