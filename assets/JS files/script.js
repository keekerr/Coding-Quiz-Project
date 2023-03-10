// Variables
var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var quizComplete
timerEl.innerText = 0;
var HighScores = [];
var arrayShuffleQuestions
var QuestionIndex = 0

// Quiz content and rendering
// https://www.geeksforgeeks.org/how-to-create-a-simple-javascript-quiz/
// source used to determine correct formatting for quiz questions and rendering
var questions = [
    {
      q: "Commonly used data types DO NOT include:",
      a: "3. alerts",
      choices: [{choice:'1. strings'}, {choice: '2. booleans'}, {choice:'3. alerts'}, {choice: '4. numbers'}],
    },

    {
      q: "The condition in an if/else statement is enclosed with ____. ",
      a: "3. parenthesis",
      choices: [{choice: '1. quotes'}, {choice: '2. curly brackets'}, {choice: '3. parenthesis'}, {choice: '4. square brackets'}],
    },

    {
      q: "Arrays in JavaScript can be used to store ___.",
      a: "4. all of the above",
      choices: [{choice: '1. numbers and strings'}, {choice: '2. other arrays' }, {choice: '3. booleans'}, {choice: '4. all of the above'}],
    },

    {
      q: "String values must be enclosed within ___ when being assigned to variables.",
      a: "3. quotes",
      choices: [{choice: '1. commas'}, {choice: '2. curly brackets'}, {choice: '3. quotes'}, {choice: '4. parenthesis'}],
    },

    {
      q: "A very useful tool used during development and debugging for printing content to the debugger is:",
      a: "4. console.log",
      choices: [{choice: '1. JavaScript'}, {choice: '2. terminal/bash'}, {choice: '3. for loops'}, {choice: '4. console.log'}],
    },
  ];

  var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")

    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    quizComplete = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
} 

// Timer
var setTime = function () {
    timeleft = 75;

var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--

    if (quizComplete) {
        clearInterval(timercheck)
    }

    if (timeleft < 0) {
        showScore()
        timerEl.innerText = 0
        clearInterval(timercheck)
    }

    }, 1000)
}

var startGame = function() {

    

    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');

    //question shuffle for random

    arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}


var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffleQuestions[QuestionIndex])
}


var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};


// https://stackoverflow.com/questions/40569293/displaying-questions-for-a-quiz-using-javascript
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {

    var answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    answerbuttonsEl.appendChild(answerbutton)
    }
};


var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}


var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")

    }
}


// https://stackoverflow.com/questions/40569293/displaying-questions-for-a-quiz-using-javascript
var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffleQuestions[QuestionIndex].a === selectedanswer.innerText) {
            answerCorrect()
            score = score + 25
        }

        else {
            answerWrong()
            score = score - 0;
            timeleft = timeleft - 10;
        };

    

    QuestionIndex++ 
    if (arrayShuffleQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }
    else {
        quizComplete = "true";
        showScore();
        }
    }

    

var showScore = function() {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}


var createHighScore = function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
        if (!initials) {
            alert("Enter your initials!");
            return;
        }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }


    HighScores.push(HighScore);
    HighScores.sort((a,b) => {return b.score-a.score});

    while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
}


for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.className = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + "-" + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}


var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a,b) => {return b.score-a.score})

    for (var i=0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + "-" + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);
            HighScores.push(LoadedHighScores[i]);
    }
}
    
    var displayHighScores = function() {
        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        quizComplete = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
        }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
        }
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
        }
        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

  
    var clearScores = function () {
        HighScores = [];
        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }
        localStorage.clear(HighScores);
    }

    loadHighScore()

    
    btnStartEl.addEventListener("click", startGame)
    formInitials.addEventListener("submit", createHighScore)
    ViewHighScoreEl.addEventListener("click", displayHighScores)
    btnGoBackEl.addEventListener("click", renderStartPage)
    btnClearScoresEl.addEventListener("click", clearScores)

