document.addEventListener("DOMContentLoaded", function () {
    let userScore = 0;
    let computerScore = 0;
    let roundsToPlay = 5;
    let roundsPlayed = 0;

    const userScoreElement = document.getElementById("userScore");
    const computerScoreElement = document.getElementById("computerScore");
    const resultElement = document.getElementById("result");
    const symbols = document.querySelectorAll(".symbol");
    const restartBtn = document.getElementById("restartBtn");
    const roundsBox = document.querySelector(".rounds-box");

    symbols.forEach(symbol => {
        symbol.addEventListener("click", () => playRound(symbol.id));
    });

    restartBtn.addEventListener("click", resetGame);

    function playRound(userChoice) {
        if (roundsPlayed < roundsToPlay) {
            const computerChoice = getComputerChoice();
            const result = getResult(userChoice, computerChoice);

            resultElement.textContent = result;

            if (result.includes("Win")) {
                userScore++;
            } else if (result.includes("Lose")) {
                computerScore++;
            }

            roundsPlayed++;
            updateScores();

            if (roundsPlayed === roundsToPlay) {
                endGame();
            }
        }
    }

    function getComputerChoice() {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function getResult(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "It's a draw!";
        } else if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            return `You Win! ${userChoice} beats ${computerChoice}.`;
        } else {
            return `You Lose! ${computerChoice} beats ${userChoice}.`;
        }
    }

    function endGame() {
        let winner;

        if (userScore > computerScore) {
            winner = "You";
        } else if (userScore < computerScore) {
            winner = "Comp";
        } else {
            winner = "It's a draw!";
        }

        resultElement.textContent = `Game Over! ${winner} is the Winner!`;

        restartBtn.style.display = "block";
        disableSymbols();
        hideElements(); // Neue Funktion, um andere Elemente zu verbergen
    }

    function resetGame() {
        userScore = 0;
        computerScore = 0;
        roundsPlayed = 0;

        restartBtn.style.display = "none";
        enableSymbols();
        showElements(); // Neue Funktion, um andere Elemente anzuzeigen
        updateScores();
        resultElement.textContent = "Let's Play";
    }

    function updateScores() {
        userScoreElement.textContent = userScore;
        computerScoreElement.textContent = computerScore;
    }

    function disableSymbols() {
        symbols.forEach(symbol => {
            symbol.removeEventListener("click", () => playRound(symbol.id));
            symbol.style.cursor = "not-allowed";
        });
    }

    function enableSymbols() {
        symbols.forEach(symbol => {
            symbol.addEventListener("click", () => playRound(symbol.id));
            symbol.style.cursor = "pointer";
        });
    }

    function hideElements() {
        roundsBox.style.display = "none";
        symbols.forEach(symbol => {
            symbol.style.display = "none";
        });
    }

    function showElements() {
        roundsBox.style.display = "block";
        symbols.forEach(symbol => {
            symbol.style.display = "block";
        });
    }
});
