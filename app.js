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

function assignClicks() {
    document.querySelectorAll(".pad").forEach((p) => {
        p.addEventListener("click", () => {
            const padClicked = p.dataset.color;
            handleUserInput(padClicked,);
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
    backBtn.addEventListener("click", () => {
        handleReset();
        difficulty = null;
        createLevels();
    });
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
        resetBtn.addEventListener("click", goBackToSameLevel);

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

function setBoardInteractivity(enabled) {
    document.querySelectorAll(".pad").forEach(pad => {
        pad.style.pointerEvents = enabled ? "auto" : "none";
    });
}


function nextRound() {
    console.log("next Round...")
    userSeq = [];
    round = round + 1;
    if (difficulty === "easy" || difficulty === "hard") {
        gameSeq.push(getRandomColor());
    } else if (difficulty === "medium") {
        gameSeq.push(getRandomColor());
        gameSeq.push(getRandomColor());
    }
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
        showGameOver();
        handleReset();
        return;
    }
    if (userSeq.length === gameSeq.length) {
        isUserTurn = false;
        setTimeout(() => {
            gameScore = gameScore + 1;
            nextRound();
            updateScoreAndRound();
            if (difficulty === "hard") {
                shufflePads();
                setTimeout(() => { playSequence() }, 600)
            } else
                playSequence();
        }, 500)
    }
}

function playSequence() {
    isUserTurn = false;
    setBoardInteractivity(false);
    let blinkDelay = 0;

    if (difficulty === "easy") {
        blinkDelay = 900;
    } else if (difficulty === "medium") {
        blinkDelay = 600;
    } else if (difficulty === "hard") {
        blinkDelay = 500;
    }

    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            blink(color)
            if (index === gameSeq.length - 1) {
                setTimeout(() => {
                    isUserTurn = true;
                    setBoardInteractivity(true);
                }, 350);
            }
        }, index * blinkDelay);
    })
}

function updateScoreAndRound() {
    const score1 = document.getElementById("score");
    const round1 = document.getElementById("level");
    if (score1) {
        score1.textContent = `Score: ${gameScore}`;
    }
    if (round1) {
        round1.textContent = `Level: ${round}`
    }
}

function goBackToSameLevel() {
    handleReset();

    if (difficulty === "easy") {
        handleEasyLevel();
    }
    else if (difficulty === "medium") {
        handleMediumLevel();
    } else if (difficulty === "hard") {
        handleHardLevel();
    }
}

function showGameOver() {
    mainContainer.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.classList.add("gameOverh1");
    h1.textContent = "Game Over!"

    let h2 = document.createElement("h2");
    h2.classList.add("gameOverh2");
    h2.textContent = `Score ${gameScore}`

    let backToLevels = document.createElement("button");
    backToLevels.textContent = "Play Again";
    backToLevels.classList.add("backToLevels")
    backToLevels.addEventListener("click", goBackToSameLevel);

    mainContainer.appendChild(h1);
    mainContainer.appendChild(h2);
    mainContainer.appendChild(backToLevels);
}

function getRandomPositions() {
    const positionsCopy = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const random = [];
    let i = 0;
    while (i < 4) {
        let num = Math.floor(Math.random() * 9);
        console.log("random number Generated", num);

        if (positionsCopy[num] !== 99) {
            random.push(num);
            positionsCopy[num] = 99
            i++;
        }
    }
    return random;
}

function shufflePads() {
    console.log("shuffle pads function");
    const pads = document.querySelectorAll(".pad");
    const padPositions = [[1, 1], [1, 2], [1, 3],
    [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
    let positions = getRandomPositions();

    pads.forEach((pad, index) => {
        const [row, col] = padPositions[positions[index]];
        pad.style.gridRow = row;
        pad.style.gridColumn = col;
    });

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
    replaceStartWithReset();
    round = 0;
    gameScore = 0;
    gameSeq = [];
    userSeq = [];
    updateScoreAndRound();
    isGameRunning = true;
    difficulty = "easy";
    nextRound();
    updateScoreAndRound();
    playSequence();
}

function handleMediumLevel() {
    console.log("clicked medium level button");
    mainContainer.innerHTML = "";

    basicGameBody(handleMediumStart);
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
    if (isGameRunning) return;
    replaceStartWithReset();
    round = 0;
    gameScore = 0;
    gameSeq = [];
    userSeq = [];
    isGameRunning = true;
    difficulty = "medium";
    nextRound();
    updateScoreAndRound();
    playSequence();
}

function handleHardLevel() {
    console.log("clicked hard level button");
    mainContainer.innerHTML = "";

    basicGameBody(handleHardStart);
    const gameContainer = document.getElementById("gameContainer");

    gameContainer.innerHTML = "Hard";

    gameContainer.innerHTML = `
    <div class="level1Board" id="hardBoard">
        <div  style="border-radius: 12%;" class="pad green top " data-color="green" ></div>
        <div style="border-radius: 12%;" class="pad red  bottom" data-color="red" ></div>        
        <div style="border-radius: 12%;" class="pad yellow left" data-color="yellow" ></div>
        <div style="border-radius: 12%;" class="pad blue right" data-color="blue" ></div>        
    </div>
    `

    assignClicks();
}

function handleHardStart() {
    console.log("Hard Level start clicked")
    if (isGameRunning) return;
    replaceStartWithReset();
    round = 0;
    gameScore = 0;
    userSeq = [];
    gameSeq = [];
    updateScoreAndRound();
    isGameRunning = true;
    difficulty = "hard";
    nextRound();
    updateScoreAndRound();
    playSequence();
}