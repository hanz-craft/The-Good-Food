const foodData = [
    { name: "Apple", emoji: "🍎", healthy: true }, { name: "Banana", emoji: "🍌", healthy: true },
    { name: "Carrot", emoji: "🥕", healthy: true }, { name: "Broccoli", emoji: "🥦", healthy: true },
    { name: "Milk", emoji: "🥛", healthy: true }, { name: "Fish", emoji: "🐟", healthy: true },
    { name: "Egg", emoji: "🥚", healthy: true }, { name: "Water", emoji: "💧", healthy: true },
    { name: "Candy", emoji: "🍬", healthy: false }, { name: "Soda", emoji: "🥤", healthy: false },
    { name: "Chips", emoji: "🍟", healthy: false }, { name: "Chocolate", emoji: "🍫", healthy: false }
];

let score = 0;
let gameItems = [...foodData].sort(() => Math.random() - 0.5);
let currentIndex = 0;
let reviewed = new Set();

// 1. Vocabulary Setup
const grid = document.getElementById('vocab-grid');
foodData.forEach(food => {
    const card = document.createElement('div');
    card.className = 'card pop-in';
    card.innerHTML = `<div>${food.emoji}</div><p>${food.name}</p>`;
    card.onclick = () => {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(food.name));
        reviewed.add(food.name);
        if(reviewed.size >= 5) document.getElementById('start-game-btn').classList.remove('hidden');
    };
    grid.appendChild(card);
});

// 2. Navigation
document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('vocab-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    renderGameItem();
};

// 3. Game Logic
function renderGameItem() {
    if (currentIndex < gameItems.length) {
        document.getElementById('game-emoji').innerText = gameItems[currentIndex].emoji;
    } else {
        showEnd();
    }
}

function checkAnswer(isHealthy) {
    if (gameItems[currentIndex].healthy === isHealthy) {
        score++;
        document.getElementById('score').innerText = score;
        alert("🎉 Great Job!");
    } else {
        alert("✨ Try again!");
    }
    currentIndex++;
    renderGameItem();
}

function showEnd() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score-display').innerText = "⭐".repeat(score);
}
