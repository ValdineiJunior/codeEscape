(function () {
    const buttonCount = 8;
    const puzzle = [
        ["mensagem 1"],
        ["mensagem 2"],
        ["mensagem 3"],
        ["mensagem 4"],
        ["mensagem 5"],
        ["mensagem 6"],
        ["mensagem 7"],
        ["mensagem 8"],
        ["mensagem 9"],
        ["mensagem 10"],
    ];
    const combinations = [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
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
            console.log("Combinação correta!");

            nextCombinationIndex++;

            removeLockedElements();
            addCompletedElements();
            addEventListenerToNewButtons();
        } else {
            console.log("Combinação incorreta!");
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
