let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "blue"];
let started = false;
let level = 0;

// Retrieve the highest score from localStorage, default to 0
let highestScore = localStorage.getItem("highestScore") || 0;

// Elements for dynamic updates
let levelDisplay = document.getElementById("level-display");
let highestScoreDisplay = document.getElementById("highest-score");

// Set initial highest score
highestScoreDisplay.innerHTML = `🏆 Highest Score: <b>${highestScore}</b>`;

document.addEventListener("keypress", function () {
    console.log("game started");
    if (started == false) {
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    levelDisplay.innerText = `Level ${level}`;

    // Random button choose
    let randIdx = Math.floor(Math.random() * 4);  // Correct index range 0 to 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update the highest score
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
            highestScoreDisplay.innerHTML = `🏆 Highest Score: <b>${highestScore}</b>`;
        }

        // Game Over Display
        levelDisplay.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart.`;

        // Flash red background for 1 second
        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 1000); // 1 second flash

        reset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log(userColor);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    levelDisplay.innerHTML = "Press any key to start the game";
}
