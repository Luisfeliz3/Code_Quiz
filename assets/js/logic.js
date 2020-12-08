// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var score = 0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreen = document.getElementById("start-screen");
var wrapper = document.getElementsByClassName("wrapper");
var questionTitleElement = document.querySelector("#question-title");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  startScreen.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.setAttribute("class", "show");

  // start timer

  timerId = setInterval(() => {
    clockTick();
  }, 1000);
  // show starting time
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var questionTitle = questions[currentQuestionIndex].title;

  // update title with current question
  questionTitleElement.innerHTML = questionTitle;

  // clear out any old question choices
  document.querySelector("#choices").innerHTML = " ";
  var choices = questions[currentQuestionIndex].choices;

  // console.log(choices.length+ "your choices are ");
  for (let index = 0; index < choices.length; index++) {
    var choiceButtons = document.createElement("button");
    choiceButtons.setAttribute("class", "button");
    choiceButtons.innerHTML = choices[index];
    document.querySelector("#choices").append(choiceButtons);
  }

  document.querySelector("#choices").addEventListener("click", function (e) {
    if (!e.target.matches("buttons")) questionClick(e.target.textContent);
    e.stopImmediatePropagation();
  });
}

function questionClick(answerClicked) {
  let questionAnswer = questions[currentQuestionIndex].answer;
  var choices = questions[currentQuestionIndex].choices;

  console.log(choices.length + "your choices are ");
  //check if user guessed wrong
  if (answerClicked !== questionAnswer) {
    // penalize time
    time = time - 15;

    sfxWrong.play();
    feedbackEl.setAttribute("class", "feedback show");
    setTimeout(() => {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 500);
    feedbackEl.textContent = "INCORRECT!";
    setTimeout(() => {}, 500);
  } else if (answerClicked === questionAnswer) {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.setAttribute("class", "feedback show");
    setTimeout(() => {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 500);
    feedbackEl.textContent = "CORRECT!";
    score++;
    setTimeout(() => {}, 500);
  }

  currentQuestionIndex++;
  choices.length++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  console.log("calling quix end");
  clearInterval(timerId);
  // show end screen
  document.querySelector("#end-screen").setAttribute("class", "show");

  clearInterval(timerId);
  // show final score
  document.querySelector("#final-score").innerHTML = score;

  // hide questions section
  questionsEl.remove();
  localStorage.setItem("score", score);
}

function clockTick() {
  // update time

  time--;
  timerEl.innerHTML = time;
  // check if user ran out of time
  if (timerId <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== " ") {
    // get saved scores from localstorage, or if not any, set to empty array
    JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };
    // save to localstorage

    window.localStorage.setItem("highscores", JSON.stringify(newScore));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(e) {
  // check if event key is enter
  initialsEl.addEventListener("keypress", function (e) {
    e.preventDefault();
    if (e.key === "Enter") {
      // saveHighscore
      saveHighscore();
    }
  });
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
