let playerOne = document.querySelector("#p1");
let playerTwo = document.querySelector('#p2');
let p1Display = document.querySelector('#p1Display');
let p2Display = document.querySelector("#p2Display");
let resetButton = document.querySelector('#reset');
let numInput = document.querySelector("input");
let winningScoreDisplay = document.querySelector("p span");
let playerOneScore = 0;
let playerTwoScore = 0;
let gameOver = false;
let winningScore = 5;

playerOne.addEventListener("click", () => {
    if (!gameOver) {
        playerOneScore++;
        p1Display.textContent = playerOneScore;
        if (playerOneScore === winningScore) {
            gameOver = true;
            p1Display.classList.add("winner");
        }
    }

});

playerTwo.addEventListener("click", () => {
    if (!gameOver) {
        playerTwoScore++;
        p2Display.textContent = playerTwoScore;
        if (playerTwoScore === winningScore) {
            gameOver = true;
            p2Display.classList.add("winner");
        }
    }
});

resetButton.addEventListener("click", () => {
    resetGame();
});

numInput.addEventListener("change", () => {
    winningScore = Number(this.value);
    winningScoreDisplay.textContent = this.value;
    resetGame();
});

function resetGame() {
    playerOneScore = 0;
    playerTwoScore = 0;
    p1Display.textContent = playerOneScore;
    p2Display.textContent = playerTwoScore;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    gameOver = false;
}