document.addEventListener("DOMContentLoaded", function () {
    let userScore = 0;
    let computerScore = 0;
    let roundsToPlay = 5;
    let userRoundScore = 0;
    let computerRoundScore = 0;

    const userScoreElement = document.getElementById("userScore");
    const computerScoreElement = document.getElementById("computerScore");
    const resultElement = document.getElementById("result");
    const symbols = document.querySelectorAll(".symbol");
    const restartBtn = document.getElementById("restartBtn");

    symbols.forEach(symbol => {
        symbol.addEventListener("click", () => playRound(symbol.id));
    });

    restartBtn.addEventListener("click", resetGame);

    function playRound(userChoice) {
        const computerChoice = getComputerChoice();
        const result = getResult(userChoice, computerChoice);

        resultElement.textContent = result;

        if (result.includes("Win")) {
            userScore++;
            userRoundScore++;
        } else if (result.includes("Lose")) {
            computerScore++;
            computerRoundScore++;
        }

        updateScores();
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

    function updateScores() {
        userScoreElement.textContent = userScore;
        computerScoreElement.textContent = computerScore;

        if (userRoundScore + computerRoundScore === roundsToPlay) {
            endGame();
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
    }

    function resetGame() {
        userScore = 0;
        computerScore = 0;
        userRoundScore = 0;
        computerRoundScore = 0;

        restartBtn.style.display = "none";
        enableSymbols();
        updateScores();
        resultElement.textContent = "Let's Play";
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
});
