

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var score =0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  document.querySelector("#start-screen").remove();
  // hide start screen
  // un-hide questions section
  document.body.appendChild(questionsEl);
  // start timer
  setInterval(() => {
    timerEl.innerHTML = time--;
  }, 1000);
  // show starting time
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var questionTitle = questions[currentQuestionIndex].title;

  // update title with current question
  let questionTitleElement = document.querySelector("#question-title");
  questionTitleElement.innerHTML = questionTitle;
  questionsEl.setAttribute('class', 'show');
  choicesEl.setAttribute('class', 'choices show');

  // clear out any old question choices
  document.querySelector("#choices").innerHTML = " ";


  for (const question of questions[currentQuestionIndex].choices) {
    let button = document.createElement('button');
    button.setAttribute('class', "button");
    button.innerHTML = question;
    document.querySelector("#choices").append(button);
  }

  document.querySelector("#choices").addEventListener("click", function (e) {
   
    questionClick(e.target.innerHTML);

  })  
  // loop over choices
  // create new button for each choice
  // attach click event listener to each choice
  // splay on the page
}

function questionClick(answerClicked) {
  let questionAnswer = questions[currentQuestionIndex].answer;




  
  //check if user guessed wrong

  if (answerClicked === questionAnswer) {



    // play "right" sound effect
    sfxRight.play();
    feedbackEl.setAttribute('class', 'feedback show');
    setTimeout(() => {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 500);
    feedbackEl.textContent = "CORRECT!"
    setTimeout(() => { }, 500);
    // flash right/wrong feedback on page for half a second

 
  }
  else {
    // penalize time
    time = time - 15;
    console.log(answerClicked  + "-------------------->>>>>>>>>>>>>ANSWER CLICK");
    console.log(questionAnswer+ "-------------------->>>>>>>>>>>>>QUESTION CLICK");
    sfxWrong.play();
    feedbackEl.setAttribute('class', 'feedback show');
    setTimeout(() => {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 500);
    feedbackEl.textContent = "INCORRECT!";
    setTimeout(() => { }, 500);
    score++;
  }
  
  currentQuestionIndex++

  if (currentQuestionIndex === 3) {
    quizEnd();
  }
  getQuestion();
  // else
  // move to next question
  // check if we've run out of questions
  // quizEnd
  // else
  // getQuestion
}

function quizEnd() {
  console.log('calling quix end');
  // show end screen
  document.querySelector('#end-screen').setAttribute('class', 'show');
  

  // show final score
  document.querySelector('#final-score').innerHTML=score;

  
  // hide questions section
  questionsEl.remove();
  localStorage.setItem("score", score)
}

function clockTick() {
  // update time
  // check if user ran out of time
}

function saveHighscore() {
  // get value of input box
  document.querySelector('initials').addEventListener('input', function (evt) {
    cosole.log(this.value);
});

console.log(this.value)
  // make sure value wasn't empty
  // get saved scores from localstorage, or if not any, set to empty array
  // format new score object for current user
  // save to localstorage
  // redirect to next page
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
