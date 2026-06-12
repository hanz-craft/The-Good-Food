const foodList = [
    { name: "Apple", emoji: "🍎", healthy: true }, { name: "Banana", emoji: "🍌", healthy: true },
    { name: "Carrot", emoji: "🥕", healthy: true }, { name: "Broccoli", emoji: "🥦", healthy: true },
    { name: "Fish", emoji: "🐟", healthy: true }, { name: "Milk", emoji: "🥛", healthy: true },
    { name: "Egg", emoji: "🥚", healthy: true }, { name: "Rice", emoji: "🍚", healthy: true },
    { name: "Water", emoji: "💧", healthy: true }, { name: "Mango", emoji: "🥭", healthy: true },
    { name: "Candy", emoji: "🍬", healthy: false }, { name: "Soda", emoji: "🥤", healthy: false },
    { name: "Chips", emoji: "🍟", healthy: false }, { name: "Chocolate", emoji: "🍫", healthy: false },
    { name: "Cake", emoji: "🎂", healthy: false }
];

let score = 0;
let level = 1;
let currentItem = 0;
let reviewedCount = 0;
const reviewed = new Set();

// 1. Init Vocabulary
const vocabGrid = document.getElementById('vocab-grid');
foodList.forEach(food => {
    const card = document.createElement('div');
    card.className = 'v-card';
    card.innerHTML = `<div>${food.emoji}</div><small>${food.name}</small>`;
    card.onclick = () => {
        document.getElementById('preview-emoji').innerText = food.emoji;
        document.getElementById('preview-name').innerText = food.name;
        speak(food.name);
        reviewed.add(food.name);
        if(reviewed.size >= 5) document.getElementById('start-game-btn').classList.remove('hidden');
    };
    vocabGrid.appendChild(card);
});

function speak(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

// 2. Game Logic
document.getElementById('start-game-btn').onclick = () => {
    document.getElementById('vocab-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    nextItem();
};

function nextItem() {
    if (currentItem >= 15) {
        showFinalScreen();
        return;
    }
    const item = foodList[Math.floor(Math.random() * foodList.length)];
    document.getElementById('game-emoji').innerText = item.emoji;
    window.currentItemObj = item;
    
    // Set level titles
    if(score < 3) document.getElementById('level-title').innerText = "Level 1: Easy";
    else if(score < 8) document.getElementById('level-title').innerText = "Level 2: Medium";
    else document.getElementById('level-title').innerText = "Level 3: Fast Hero";
}

function submitAnswer(isHealthy) {
    if (window.currentItemObj.healthy === isHealthy) {
        score++;
        document.getElementById('feedback').innerText = "🎉 Great Job!";
        document.getElementById('feedback').style.color = "green";
    } else {
        document.getElementById('feedback').innerText = "❌ Try again!";
        document.getElementById('feedback').style.color = "red";
    }
    document.getElementById('score').innerText = score;
    currentItem++;
    setTimeout(nextItem, 1000);
}

function showFinalScreen() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
}
