// Food Data
const foodData = [
    { name: "Apple", emoji: "🍎", healthy: true },
    { name: "Candy", emoji: "🍬", healthy: false },
    { name: "Broccoli", emoji: "🥦", healthy: true },
    { name: "Chips", emoji: "🍟", healthy: false },
    { name: "Banana", emoji: "🍌", healthy: true },
    { name: "Soda", emoji: "🥤", healthy: false },
    { name: "Carrot", emoji: "🥕", healthy: true },
    { name: "Chocolate", emoji: "🍫", healthy: false },
    { name: "Fish", emoji: "🐟", healthy: true },
    { name: "Cake", emoji: "🎂", healthy: false },
    { name: "Milk", emoji: "🥛", healthy: true },
    { name: "Water", emoji: "💧", healthy: true },
    { name: "Rice", emoji: "🍚", healthy: true },
    { name: "Egg", emoji: "🥚", healthy: true },
    { name: "Mango", emoji: "🥭", healthy: true }
];

// Variables
let shuffledFood = [...foodData].sort(() => Math.random() - 0.5);
let currentIndex = 0;
let score = 0;

// Elements
const foodEmoji = document.getElementById("food-emoji");
const foodName = document.getElementById("food-name");
const scoreEl = document.getElementById("score");
const feedback = document.getElementById("feedback-message");
const btnGood = document.getElementById("btn-good");
const btnJunk = document.getElementById("btn-junk");
const gameArea = document.getElementById("game-area");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");

// Display next item
function showItem() {
    if (currentIndex < shuffledFood.length) {
        const item = shuffledFood[currentIndex];
        foodEmoji.innerText = item.emoji;
        foodName.innerText = item.name;
    } else {
        showEndScreen();
    }
}

// Handle choices
function checkAnswer(isHealthyChoice) {
    const item = shuffledFood[currentIndex];
    
    // Disable buttons temporarily
    btnGood.disabled = true;
    btnJunk.disabled = true;

    if (item.healthy === isHealthyChoice) {
        score++;
        scoreEl.innerText = score;
        feedback.innerText = "🎉 Great Job!";
        feedback.style.color = "#4CAF50";
    } else {
        feedback.innerText = "✨ Try again!";
        feedback.style.color = "#F44336";
    }

    setTimeout(() => {
        currentIndex++;
        feedback.innerText = "";
        btnGood.disabled = false;
        btnJunk.disabled = false;
        showItem();
    }, 1000);
}

function showEndScreen() {
    gameArea.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScore.innerText = score;
}

// Event Listeners
btnGood.addEventListener("click", () => checkAnswer(true));
btnJunk.addEventListener("click", () => checkAnswer(false));

// Init
showItem();
