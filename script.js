(function () {
    const buttonCount = 8;
    const puzzle = [
        ["Welcome ! Do you understand a little about programming ? If you give me a true answer , then you can proceed to the next puzzle."],
        ["Alright, for the next you'll need some math to solve. what is the next number in this sequence 1, 4, 13, 40, ?."],
        ["Very well ! Sometimes, the litle thing you're missing is the answer to the problem, good look !"],
        ["You've solved the last puzzles with ease, but unfortunately you weren't the first one. At least 50 others came before you. If you were the prime, who knows if you could solve this puzzle."],
        ["Thank you for reaching challenge 5! You're doing great, keep up the good work."],
        ["For this excellent work you are doing, you must be using good Development Tools, right ?"],
        ["The Two of us have been gaining experience in puzzles from the very beginning, Doubling our capacity with Each Correct Answer. How experienced are we now?"],
        ["To unlock the next buttons below, which are currently in Red, and turn them Yellow, I will need a bit more Intensity in this puzzle. Can you give me that ?"],
        ["The next sequence can be found on the Radio, depending on the Base, It is the same from front to back and from top to bottom."],
        ["Well, to close the puzzle, I would like to congratulate you. Your Odds are small, but just because of your effort to follow the guideLines, you finished it."],
        ["Congratulations on solving those puzzles!"]
    ];
    const combinations = [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 0],
    ];

    let nextCombinationIndex = 0;

    const buttonsContainers = document.querySelectorAll(".buttons");

    buttonsContainers.forEach(createButtons);

    removeLockedElements();
    addEventListenerToNewButtons();

    function createButtons(container) {
        for (let i = 0; i < buttonCount; i++) {
            const button = document.createElement("div");
            button.classList.add("button", "off");
            container.appendChild(button);
        }
    }

    function addEventListenerToNewButtons() {
        const buttons = document.querySelectorAll(".button");

        buttons.forEach((button) => {
            const parentContainer = button.parentElement;
            const isLockedOrCompleted =
                parentContainer.classList.contains("locked") ||
                parentContainer.classList.contains("completed");

            if (!isLockedOrCompleted) {
                button.removeEventListener("click", handleButtonClick);
                button.removeEventListener("touchstart", handleButtonClick);
                button.addEventListener("click", handleButtonClick);
                button.addEventListener("touchstart", handleButtonClick);
            } else {
                button.removeEventListener("click", handleButtonClick);
                button.removeEventListener("touchstart", handleButtonClick);
            }
        });
    }

    function handleButtonClick() {
        toggleButtonState(this);

        const puzzleDiv = this.closest("#game-container").querySelector("#tvScreen");
        const buttonStates = Array.from(
            this.parentElement.querySelectorAll(".button")
        ).map(({ classList }) => (classList.contains("on") ? 1 : 0));

        checkCombination(buttonStates);

        if (nextCombinationIndex < puzzle.length) {
            puzzleDiv.textContent = puzzle[nextCombinationIndex][0];
        }
    }

    function toggleButtonState(button) {
        button.classList.toggle("on");
        button.classList.toggle("off");
    }

    function checkCombination(buttonStates) {
        const currentCombination = combinations[nextCombinationIndex];

        const isCorrectCombination =
            currentCombination.length === buttonStates.length &&
            currentCombination.every((state, index) => state === buttonStates[index]);

        if (isCorrectCombination) {
            nextCombinationIndex++;
            if(nextCombinationIndex == 5) {
              console.log("GOODTOOL")
            }
            removeLockedElements();
            addCompletedElements();
            addEventListenerToNewButtons();
        } else {
        }
    }

    function removeLockedElements() {
        const lockedButtons = document.querySelector(".buttons.locked");
        if (lockedButtons) {
            lockedButtons.classList.remove("locked");
        }
    }

    function addCompletedElements() {
        const incompleteButtons = document.querySelector(".buttons:not(.completed)");
        if (incompleteButtons) {
            incompleteButtons.classList.add("completed");
        }
    }

    const puzzleDiv = document.querySelector("#tvScreen");
    if (puzzle.length > 0) {
        puzzleDiv.textContent = puzzle[0][0];
    }
})();
