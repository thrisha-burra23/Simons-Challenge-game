const body = document.body;
const mainContainer = document.getElementById("mainContainer");

let isGameRunning = false;
let isUserTurn = false;
let gameSeq = [];
let userSeq = [];
let gameScore = 0;
let difficulty = null;
let round = 0;
const colors = ["red", "green", "yellow", "blue"];

document.addEventListener("DOMContentLoaded", createLevels);

function createLevels() {
    console.log("back button pressed or starting loading")
    mainContainer.innerHTML = "";

    const levelContainer = document.createElement("div");
    const levelBtnContainer = document.createElement("div");
    const h1 = document.createElement("h1");
    const easyLevelBtn = document.createElement("button");
    const mediumLevelBtn = document.createElement("button");
    const hardLevelBtn = document.createElement("button");

    h1.textContent = "Ready to test your memory? Choose your level!";
    easyLevelBtn.textContent = "Easy";
    mediumLevelBtn.textContent = "Medium";
    hardLevelBtn.textContent = "Hard";

    levelContainer.classList.add("levelContainer");
    levelBtnContainer.classList.add("levelBtnContainer");
    h1.classList.add("mainHeading");
    easyLevelBtn.classList.add("LevelBtn")
    mediumLevelBtn.classList.add("LevelBtn");
    hardLevelBtn.classList.add("LevelBtn");

    easyLevelBtn.addEventListener("click", handleEasyLevel);
    mediumLevelBtn.addEventListener("click", handleMediumLevel);
    hardLevelBtn.addEventListener("click", handleHardLevel);

    levelBtnContainer.appendChild(easyLevelBtn);
    levelBtnContainer.appendChild(mediumLevelBtn);
    levelBtnContainer.appendChild(hardLevelBtn);

    levelContainer.appendChild(h1);
    levelContainer.appendChild(levelBtnContainer);

    mainContainer.appendChild(levelContainer);

}

function assignClicks(){
    document.querySelectorAll(".pad").forEach((p)=>{
        p.addEventListener("click",()=>{
            const padClicked=p.dataset.color;
            handleUserInput(padClicked);
        })
    })
}

function basicGameBody(handleLevel) {
    const backBtn = document.createElement("button");
    const resetBtn = document.createElement("button");
    const level = document.createElement("p");
    const score = document.createElement("p");
    const gameHeader = document.createElement("div");
    const gameContainer = document.createElement("div");
    const gameStart = document.createElement("div");

    backBtn.className = "backBtn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", createLevels);
    backBtn.classList.add("backBtn");

    resetBtn.className = "resetBtn";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", handleReset);
    resetBtn.classList.add("resetBtn");
    resetBtn.setAttribute("id", "resetBtn");

    level.textContent = `level ${round}`;
    level.setAttribute("id", "level");
    score.textContent = `score ${gameScore}`;
    score.setAttribute("id", "score");

    gameHeader.appendChild(backBtn);
    gameHeader.appendChild(level);
    gameHeader.appendChild(score);

    gameContainer.setAttribute("id", "gameContainer");
    gameHeader.setAttribute("id", "gameHeader");

    gameStart.setAttribute("id", "gameStart");

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.classList.add("startBtn");
    startBtn.addEventListener("click", handleLevel)
    gameStart.appendChild(startBtn);

    mainContainer.appendChild(gameHeader);
    mainContainer.appendChild(gameContainer);
    mainContainer.appendChild(gameStart);

}

function handleReset() {
    console.log("Reset clicked")
    round = 0;
    gameScore = 0;
    userSeq = [];
    gameSeq = [];
    isGameRunning = false;
    isUserTurn = false;
}

function replaceStartWithReset() {
    const gameStart = document.getElementById("gameStart");
    const startBtn = document.querySelector(".startBtn");
    if (isGameRunning == false) {

        if (startBtn) {
            startBtn.remove();
        }
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset";
        resetBtn.classList.add("resetBtn");
        resetBtn.addEventListener("click", handleReset);

        gameStart.appendChild(resetBtn);
    }
}

function blink(color) {
    const pad = document.querySelector(`.${color}`);
    if (!pad) {
        console.log("no pad exists");
        return;
    }
    pad.classList.add("active");
    setTimeout(() =>
        pad.classList.remove("active"), 350);
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length);
    console.log(index);
    return colors[index];
}

function nextRound() {
    console.log("next ROund...")
    userSeq = [];
    round = round + 1;
    gameSeq.push(getRandomColor());
}

function handleUserInput(color) {
    if (!isGameRunning || !isUserTurn) return;
    blink(color)
    userSeq.push(color)
    checkAnswer(userSeq.length - 1);
}

function checkAnswer(index) {
    if (userSeq[index] !== gameSeq[index]) {
        console.log("wrong sequence!");
        handleReset();
        return;         
    } 
    if(userSeq.length===gameSeq.length){
        gameScore=gameScore+1;
        nextRound();
        setTimeout(playSequence,600)
    }
}

function playSequence() {
    isUserTurn = false;
    const blinkDelay = 600;
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            blink(color)
            if (index === gameSeq.length - 1) {
                isUserTurn = true;
            }
        }, index * blinkDelay);
    })
}

function handleEasyLevel() {
    console.log("clicked easy level button");

    mainContainer.innerHTML = "";

    basicGameBody(handleEasyStart);
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "Easy";

    gameContainer.innerHTML = `
    <div class="level1Board">
        <div  style="border-radius: 12%;" class="pad green top" data-color="green" id="green1"></div>
        <div style="border-radius: 12%;" class="pad red left " data-color="red" id="red1"></div>
        <div style="border-radius: 12%;" class=" center"  id="center"></div>
        <div style="border-radius: 12%;" class="pad yellow right" data-color="yellow" id="yellow1"></div>
        <div style="border-radius: 12%;" class="pad blue bottom" data-color="blue" id="blue1"></div>
    </div>
    `
    assignClicks();
}

function handleEasyStart() {
    console.log("Easy Level start clicked")
    if (isGameRunning) return;

    isGameRunning = true;
    difficulty = "Easy";
    nextRound();
    playSequence();
}

function handleMediumLevel() {
    console.log("clicked easy level button"); 
    mainContainer.innerHTML = "";

    basicGameBody(handleEasyStart);
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "Medium";

    gameContainer.innerHTML = `
    <div class="level1Board">
        <div  style="border-radius: 100%;" class="pad green top" data-color="green" id="green2"></div>
        <div style="border-radius: 100%;" class="pad red left " data-color="red" id="red2"></div>        
        <div style="border-radius: 100%;" class="pad yellow right" data-color="yellow" id="yellow2"></div>
        <div style="border-radius: 100%;" class="pad blue bottom" data-color="blue" id="blue2"></div>
    </div>
    `
    assignClicks();
}

function handleMediumStart() {
    console.log("Medium Level start clicked")
}

function handleHardLevel() {
    console.log("clicked hard level button");
    mainContainer.innerHTML = "";

    basicGameBody(handleHardStart);
    const gameContainer = document.getElementById("gameContainer");

    gameContainer.innerHTML = "Hard";
}

function handleHardStart() {
    console.log("Hard Level start clicked")
}