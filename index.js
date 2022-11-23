



var questions = document.querySelector("#ques");
var timer = document.querySelector("#time");
var optionss = document.querySelector("#options");
var subB = document.querySelector("#score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var reviewEl = document.querySelector("#review");
var resetB = document.querySelector("#restart");



var cutrentQ = 0;
var time = ques.length * 15;
var timeId;







function getQ() {
    var currentQuestion = ques[cutrentQ];
  var promptEl = document.getElementById("questions")
    promptEl.textContent = currentQuestion.prompt;
    optionss.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        optionss.appendChild(choiceBtn);
    });
}

function start() {
    timeId = setInterval(counter, 1000);
    timer.textContent = time;
    var hanScreenEl = document.getElementById("starts");
    hanScreenEl.setAttribute("class", "vanish");
   questions.removeAttribute("class");
    getQ();
}




function quizEnd() {
    clearInterval(timeId);
    var endScreenEl = document.getElementById("done");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("finals");
    finalScoreEl.textContent = time;
   questions.setAttribute("class", "vanish");
}

var ques = [
    {
        prompt: "what is used to style?",
        options: ["js", "HTML", "css", "cats"],
        answer: "css"
    },

    {
        prompt: "where do you use functions?",
        options: ["js", "css", "HTML", "consle"],
        answer: "js"
    },

    {
        prompt: "How to write a function?",
        options: ["what function h ()", "cococ ()", "(function)", "function hats (){}"],
        answer: "function hats (){}"
    },

    {
        prompt: "which one is a boolean?",
        options: ["true", "/", "+", "$"],
        answer: "true" 
    }
    ];

function counter() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}


function bankS() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var hscore =
        JSON.parse(window.localStorage.getItem("hscore")) || [];
      var newScore = {
        score: time,
        name: name
      };
      hscore.push(newScore);
      window.localStorage.setItem("hscore", JSON.stringify(hscore));
    }
}

function questionClick() {
    if (this.value !== ques[cutrentQ].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timer.textContent = time;
      reviewEl.textContent = `Wrong! The correct answer was ${ques[cutrentQ].answer}.`;
      reviewEl.style.color = "red";
    } else {
      reviewEl.textContent = "Correct!";
      reviewEl.style.color = "green";
    }
    reviewEl.setAttribute("class", "review");
    setTimeout(function() {
      reviewEl.setAttribute("class", "review vanish");
    }, 2000);
    cutrentQ++;
    if (cutrentQ === ques.length) {
      quizEnd();
    } else {
      getQ();
    }
}

function checkInput(event) {
    if (event.key === "Enter") {
        bankS();
    }
}

function printHScore() {
    var hscore = JSON.parse(window.localStorage.getItem("hscore")) || [];
    hscore.sort(function(a, b) {
      return b.score - a.score;
    });
    hscore.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.name + " - " + score.score;
      var olEl = document.getElementById("hscore");
      olEl.appendChild(liTag);
    });
}

nameEl.onkeyup = checkInput;



subB.onclick = bankS;


startBtn.onclick = start;




var scoresBtn = document.querySelector("#hscore");





 
  function clearHScore() {
    window.localStorage.removeItem("hscore");
    window.location.reload();
  } document.getElementById("clear").onclick = clearHScore;
  
printHScore();