var olEl = document.querySelector("#highscores");

var buttonClear = document.querySelector('#clear');
function printHighscores() {

    var highscore = JSON.parse(window.localStorage.getItem("highscores")) || [];

    scores = Object.entries(highscore);
    scores.forEach(function (score) {
        // for each score
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score[1] + " -  ";
        console.log("IM ON  THE FOR EACH FUNCTION");
        // display on page
        // var olEl = document.querySelector("#highscores");
        olEl.append(liTag.innerHTML);
    });

    // display on page
}


// (and reload)
function clearHighscores() {
    olEl.textContent = "";
    
}

// attache clear event to clear score button
buttonClear.addEventListener('click', function (e){
    e.preventDefault();
    clearHighscores(e);
})

// run printhighscore when page loads
window.onload = printHighscores;
