const foodData = [
    { name: "Apple", emoji: "🍎", healthy: true },
    { name: "Banana", emoji: "🍌", healthy: true },
    { name: "Carrot", emoji: "🥕", healthy: true },
    { name: "Broccoli", emoji: "🥦", healthy: true },
    { name: "Candy", emoji: "🍬", healthy: false },
    { name: "Chips", emoji: "🍟", healthy: false },
    { name: "Milk", emoji: "🥛", healthy: true },
    { name: "Soda", emoji: "🥤", healthy: false },
    { name: "Egg", emoji: "🥚", healthy: true },
    { name: "Fish", emoji: "🐟", healthy: true }
];

const vocabList = document.getElementById('vocab-list');
const previewEmoji = document.getElementById('preview-emoji');
const previewName = document.getElementById('preview-name');
const repeatBtn = document.getElementById('repeat-audio');
const startBtn = document.getElementById('start-game-btn');

let score = 0;
let gameIndex = 0;

// Initialize Vocab List
foodData.forEach(food => {
    const item = document.createElement('div');
    item.className = 'vocab-item';
    item.innerHTML = `<span>${food.emoji}</span> ${food.name}`;
    item.onclick = () => showFood(food);
    vocabList.appendChild(item);
});

// Show Food in Preview
function showFood(food) {
    previewEmoji.innerText = food.emoji;
    previewName.innerText = food.name;
    document.getElementById('display-card').classList.remove('pop-animation');
    void document.getElementById('display-card').offsetWidth; // Trigger reflow
    document.getElementById('display-card').classList.add('pop-animation');
    speak(food.name);
}

// Speak Word
function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

repeatBtn.onclick = () => speak(previewName.innerText);

// Game Logic
startBtn.onclick = () => {
    document.getElementById('vocab-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    loadGameItem();
};

function loadGameItem() {
    if (gameIndex < foodData.length) {
        document.getElementById('game-emoji').innerText = foodData[gameIndex].emoji;
        document.getElementById('game-name').innerText = foodData[gameIndex].name;
    } else {
        alert("Game Over! Score: " + score);
        location.reload();
    }
}

function checkAnswer(choice) {
    if (foodData[gameIndex].healthy === choice) {
        score++;
        document.getElementById('score').innerText = score;
        document.getElementById('feedback').innerText = "🎉 Great Job!";
    } else {
        document.getElementById('feedback').innerText = "✨ Try again next time!";
    }
    
    setTimeout(() => {
        gameIndex++;
        document.getElementById('feedback').innerText = "";
        loadGameItem();
    }, 1000);
}
