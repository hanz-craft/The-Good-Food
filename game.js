const foods = [
    { name: "Apple", emoji: "🍎", healthy: true },
    { name: "Banana", emoji: "🍌", healthy: true },
    { name: "Carrot", emoji: "🥕", healthy: true },
    { name: "Broccoli", emoji: "🥦", healthy: true },
    { name: "Milk", emoji: "🥛", healthy: true },
    { name: "Candy", emoji: "🍬", healthy: false },
    { name: "Soda", emoji: "🥤", healthy: false },
    { name: "Chips", emoji: "🍟", healthy: false },
    { name: "Chocolate", emoji: "🍫", healthy: false }
];

let score = 0;
let current;

const vocabList = document.getElementById("vocab-list");
const vocabScreen = document.getElementById("vocab-screen");
const gameScreen = document.getElementById("game-screen");

const foodEmoji = document.getElementById("food-emoji");
const foodName = document.getElementById("food-name");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");

const healthyBtn = document.getElementById("healthy-btn");
const junkBtn = document.getElementById("junk-btn");
const startBtn = document.getElementById("start-btn");

// VOCABULARY SETUP
foods.forEach(food => {
    let div = document.createElement("div");
    div.classList.add("card-box");
    div.innerHTML = `${food.emoji}<br>${food.name}`;

    div.onclick = () => {
        speak(food.name);
    };

    vocabList.appendChild(div);
});

// TEXT TO SPEECH
function speak(text) {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

// START GAME
startBtn.onclick = () => {
    vocabScreen.classList.remove("active");
    gameScreen.classList.add("active");
    nextFood();
};

// NEXT FOOD
function nextFood() {
    current = foods[Math.floor(Math.random() * foods.length)];
    foodEmoji.textContent = current.emoji;
    foodName.textContent = current.name;
    feedback.textContent = "";
}

// CHECK ANSWER
function check(answer) {
    if (answer === current.healthy) {
        score++;
        feedback.textContent = "🎉 Great Job!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "✨ Try again!";
        feedback.style.color = "red";
    }

    scoreText.textContent = score;

    setTimeout(nextFood, 1000);
}

healthyBtn.onclick = () => check(true);
junkBtn.onclick = () => check(false);
