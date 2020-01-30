let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function() {
    reset();
});




function init() {
    setUpModeButtons();

    setUpSquares();

    reset();
}

function changeColors(color){
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return random;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}

function generateRandomColors(num) {
    let arr = [];
    for(let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function reset() {
        // generate new colors
        colors = generateRandomColors(numSquares);
        // pick new colors from array
        pickedColor = colors[pickColor()];
        // change color display to match picked color
        colorDisplay.textContent = pickedColor;
    
        messageDisplay.textContent = "";
    
        for(let i = 0; i < squares.length; i++) {
            if(colors[i]) {
                squares[i].style.display = "block";
                squares[i].style.backgroundColor = colors[i];
            }
            else {
                squares[i].style.display = "none";
            }
        }
        h1.style.backgroundColor = "steelblue";
        resetButton.textContent = "New Colors";
}

function setUpModeButtons() {
    for(let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setUpSquares() {
    for(let i = 0; i < squares.length; i++) {

        //Add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of picked square
            let clickedColor = this.style.backgroundColor;
            // compare grabed color to picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}