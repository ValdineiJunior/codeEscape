(function () {
    const buttonCount = 8;
    const puzzle = [
        ["Welcome ! To discover the first combination among the 80 buttons divided into 10 rows, I'm adding 1 clue in this text. Analyze carefully word by word to decrease the time you will need to solve the correct sequence of 4 buttons."],
        ["Well, I think you understand a little bit about programming, am I right? If you give me the truth, you can proceed to the next puzzle."],
        ["Very well, you solved the last puzzle easily, but unfortunately, you were not the first. At least 50 others came before you to get here. I wish you could have been the prime, but I'm sorry."],
        ["Sometimes, the litle thing you're missing is the answer to the problem."],
        ["Thank you for reaching challenge 5! You're doing great, keep up the good work."],
        ["For this excellent work you are doing, you must be using good development tools, right ?"],
        ["The two of us have been gaining experience in puzzles from the very beginning, doubling our capacity with each correct answer. How experienced are we now?"],
        ["To unlock the next buttons below, which are currently in red, and turn them yellow, I will need a bit more intensity in this puzzle. Can you give me that ?"],
        ["The next sequence can be found on the radio, depending on the base, It is the same from front to back and from top to bottom."],
        ["Well, to close the puzzle, I would like to congratulate you. Your Odds are small, but just because of your effort to follow the guideLines, you finished it."],
        ["Congratulations on solving those puzzles!"]
    ];
    const combinations = [
        [0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 1],
        [0, 1, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0],
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
                button.addEventListener("click", handleButtonClick);
            } else {
                button.removeEventListener("click", handleButtonClick);
            }
        });
    }

    function handleButtonClick() {
        toggleButtonState(this);

        const puzzleDiv = this.closest("#game-container").querySelector("#tv-screen");
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

    const puzzleDiv = document.querySelector("#tv-screen");
    if (puzzle.length > 0) {
        puzzleDiv.textContent = puzzle[0][0];
    }
})();
