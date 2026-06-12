document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       DATA SOURCE: INDEPENDENT GAME ROUNDS
       ========================================== */
    const gamePool = [
        { name: "Apple", emoji: "🍎", isHealthy: true },
        { name: "Candy", emoji: "🍬", isHealthy: false },
        { name: "Carrot", emoji: "🥕", isHealthy: true },
        { name: "Soda", emoji: "🥤", isHealthy: false },
        { name: "Fish", emoji: "🐟", isHealthy: true },
        { name: "Chips", emoji: "🍟", isHealthy: false },
        { name: "Banana", emoji: "🍌", isHealthy: true },
        { name: "Chocolate", emoji: "🍫", isHealthy: false },
        { name: "Broccoli", emoji: "🥦", isHealthy: true },
        { name: "Milk", emoji: "🥛", isHealthy: true }
    ];

    let currentItemIndex = 0;
    let scoreStars = 0;

    const foodEmojiDisplay = document.getElementById('game-food-emoji');
    const foodNameDisplay = document.getElementById('game-food-name');
    const scoreCounterDisplay = document.getElementById('game-score');
    const feedbackTextDisplay = document.getElementById('game-feedback');

    const btnHealthy = document.getElementById('btn-healthy');
    const btnJunk = document.getElementById('btn-junk');

    /* ==========================================
       GAME ENGINE CORE MECHANICS
       ========================================== */
    function loadGameItem() {
        feedbackTextDisplay.textContent = "Click a basket to sort!";
        feedbackTextDisplay.style.color = "#5A6E5F"; // reset text style color
        
        const currentItem = gamePool[currentItemIndex];
        foodEmojiDisplay.textContent = currentItem.emoji;
        foodNameDisplay.textContent = currentItem.name;
    }

    function processUserChoice(chosenHealthyValue) {
        const currentItem = gamePool[currentItemIndex];
        
        if (currentItem.isHealthy === chosenHealthyValue) {
            // Correct answer
            scoreStars++;
            scoreCounterDisplay.textContent = scoreStars;
            feedbackTextDisplay.textContent = "🎉 Great Job! Correct!";
            feedbackTextDisplay.style.color = "#60B36C";
        } else {
            // Incorrect answer
            feedbackTextDisplay.textContent = "✨ Try another card next time!";
            feedbackTextDisplay.style.color = "#EE6055";
        }

        // Delay next round card change briefly so child can see visual response
        setTimeout(() => {
            currentItemIndex = (currentItemIndex + 1) % gamePool.length;
            loadGameItem();
        }, 1200);
    }

    if (btnHealthy && btnJunk) {
        btnHealthy.addEventListener('click', () => processUserChoice(true));
        btnJunk.addEventListener('click', () => processUserChoice(false));
        
        // Start the game loop automatically on page load
        loadGameItem();
    }

    /* ==========================================
       DIGITAL WORKSHEET ENGINE INTERACTIVE TOGGLES
       ========================================== */
    const worksheetItems = document.querySelectorAll('.worksheet-item');
    const checkWorksheetBtn = document.getElementById('btn-check-worksheet');
    const worksheetResultsOutput = document.getElementById('worksheet-results');

    worksheetItems.forEach(item => {
        item.addEventListener('click', () => {
            // Clear prior correction markings if the user alters their selections
            item.classList.remove('correct-match', 'wrong-match');
            worksheetResultsOutput.textContent = "";
            
            // Toggle circle graphic boundary state
            item.classList.toggle('circled');
        });
    });

    if (checkWorksheetBtn) {
        checkWorksheetBtn.addEventListener('click', () => {
            let correctlyCircledCount = 0;
            let totalHealthyItemsCount = 0;
            let errorFlag = false;

            worksheetItems.forEach(item => {
                const isHealthy = item.getAttribute('data-healthy') === 'true';
                const isCurrentlyCircled = item.classList.contains('circled');

                if (isHealthy) {
                    totalHealthyItemsCount++;
                }

                if (isCurrentlyCircled && isHealthy) {
                    // Correct answer
                    item.classList.add('correct-match');
                    correctlyCircledCount++;
                } else if (isCurrentlyCircled && !isHealthy) {
                    // Child circled a junk food item
                    item.classList.add('wrong-match');
                    errorFlag = true;
                } else if (!isCurrentlyCircled && isHealthy) {
                    // Child missed circling a healthy item
                    errorFlag = true;
                }
            });

            // Display clear rewards feedback matching achievement outcomes
            if (correctlyCircledCount === totalHealthyItemsCount && !errorFlag) {
                worksheetResultsOutput.textContent = "🏆 Perfect! You found all 4 Healthy Foods! Outstanding!";
                worksheetResultsOutput.style.color = "#60B36C";
            } else {
                worksheetResultsOutput.textContent = `⭐ You found ${correctlyCircledCount} healthy items. Check again to find all healthy foods!`;
                worksheetResultsOutput.style.color = "#FF9244";
            }
        });
    }
});

/* ==========================================
   💡 BEGINNER NOTE: DYNAMIC EDITS
   ==========================================
   To insert more foods into the game loop, add an item object inside 
   the "gamePool" array layout matching this syntax scheme:
   
   { name: "Watermelon", emoji: "🍉", isHealthy: true }
*/
