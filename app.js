const body = document.body;
const mainContainer = document.getElementById("mainContainer");

let start = false;
let gameSeq = [];
let userSeq = [];
let gameScore = 0;
let gameLevel = 0;
const colors = ["red", "green", "yellow", "blue"];

const themeToggle = document.getElementById("themeToggle");
body.classList.add("light")
themeToggle.innerHTML = `<span class="material-symbols-outlined">
                            dark_mode
                            </span>`
themeToggle.addEventListener("click", () => {

})

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

    h1.textContent = "Select level";
    easyLevelBtn.textContent = "Easy";
    mediumLevelBtn.textContent = "Medium";
    hardLevelBtn.textContent = "Hard";

    levelContainer.classList.add("levelContainer");
    levelBtnContainer.classList.add("levelBtnContainer");
    h1.classList.add("mainHeading");
    easyLevelBtn.classList.add("easyLevelBtn")
    mediumLevelBtn.classList.add("mediumLevelBtn");
    hardLevelBtn.classList.add("hardLevelBtn");

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

    level.textContent = `level ${gameLevel}`;
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
    gameLevel = 0;
    gameScore = 0;
    userSeq = [];
    gameSeq = [];
    start = false;
    console.log(gameLevel)
}

function replaceStart() {
    const gameStart = document.getElementById("gameStart");
    const startBtn = document.querySelector(".startBtn");
    if (start == false) {

        if (startBtn) {
            startBtn.remove();
        }
        const resetBtn = document.createElement("button");
        resetBtn.textContent = "Reset";
        resetBtn.classList.add("resetBtn");
        resetBtn.addEventListener("click", handleReset);

        gameStart.appendChild(resetBtn);
    }}

    function handleEasyLevel() {
        console.log("clicked easy level button");
        mainContainer.innerHTML = "";

        basicGameBody(handleEasyStart);
        const gameContainer = document.getElementById("gameContainer");
        gameContainer.innerHTML = "Easy";

        gameContainer.innerHTML = `
    <div class="level1Board">
        <div  style="border-radius: 12%;" class="pad green top" id="green1">green</div>
        <div style="border-radius: 12%;" class="pad red left " id="red1">red</div>
        <div style="border-radius: 12%;" class="pad center" id="center">center</div>
        <div style="border-radius: 12%;" class="pad yellow right" id="yellow1">yellow</div>
        <div style="border-radius: 12%;" class="pad blue bottom" id="blue1">blue</div>
    </div>
    `
    }

    function handleEasyStart() {
        console.log("Easy Level start clicked", ++gameLevel)        
        if(start==false){  
        replaceStart();

        const green = document.getElementById("green1");
        const yellow = document.getElementById("yellow1");
        const blue = document.getElementById("blue1");
        const red = document.getElementById("red1");


    }

}

function handleMediumLevel() {
    console.log("clicked medium level button");
    mainContainer.innerHTML = "";

    basicGameBody(handleMediumStart);
    const gameContainer = document.getElementById("gameContainer");

    gameContainer.innerHTML = "Medium";
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