const body = document.body;
const themeToggle = document.getElementById("themeToggle");

body, classList.add("light")
themeToggle.innerHTML = `<span class="material-symbols-outlined">
                            dark_mode
                            </span>`
themeToggle.addEventListener("click",()=>{
    
})

const mainContainer = document.getElementById("mainContainer");
document.addEventListener("DOMContentLoaded", createLevels);

function createLevels() {
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

function btnCreate(handleLevel) {

    const backBtn = document.createElement("button");
    backBtn.className = "backBtn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", createLevels);
    backBtn.classList.add("backBtn");


    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.classList.add("startBtn");
    startBtn.addEventListener("click", handleLevel)

    const btnContainer = document.createElement("div");
    btnContainer.appendChild(backBtn);
    btnContainer.appendChild(startBtn);

    return btnContainer;

}

function handleEasyLevel() {
    console.log("clicked easy level button");
    mainContainer.innerHTML = "";


    const btnGroup = btnCreate(handleEasyStart);
    mainContainer.appendChild(btnGroup);
}

function handleMediumLevel() {
    console.log("clicked medium level button");
    mainContainer.innerHTML = "";

    const btnGroup = btnCreate(handleMediumStart);
    mainContainer.appendChild(btnGroup);
}

function handleHardLevel() {
    console.log("clicked hard level button");
    mainContainer.innerHTML = "";

    const btnGroup = btnCreate(handleHardStart);
    mainContainer.appendChild(btnGroup);
}

function handleEasyStart() {
    console.log("Easy Level start clicked")
}

function handleMediumStart() {
    console.log("Medium Level start clicked")
}

function handleHardStart() {
    console.log("Hard Level start clicked")
}