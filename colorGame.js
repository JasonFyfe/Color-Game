var numSquares = 6;
var colors = [];
var pickedColor;

// DOM Elements
var squares = document.querySelectorAll(".square"); // Clickable Squares
var colorDisplay = document.querySelector("#colorDisplay"); // Color to guess
var messageDisplay = document.querySelector("#message"); // Wrong or Correct Message
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

/*
 * Internal Helper Functions
 */
function init() {
    setupModeButtons();
    setupSquares();
    resetGame();
}

function setupModeButtons() {
    // Logic for Easy or Hard Buttons
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            resetGame();
        });
    }
    // Click event on reset button
    resetButton.addEventListener("click", resetGame);
}

function setupSquares() {
    // Click even for game UI
    for (let i = 0; i < squares.length; i++) {
        // Adding a click listener and game logic
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) { // Change all square to correct color and display message
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?";
            }
            else { // Fade out wrong square and display message
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

// Changes all squares to be winning color
function changeColors(color) {
    // loop through all of the squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}
// returns a random color from our array of colors
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
// Generates random colors
function generateRandomColors(num) {
    // Make an array
    var array = [];
    // add num random colors to array
    for (let i = 0; i < num; i++) {
        // get random color and push into array
        array.push(randomColor());
    }
    // return array
    return array;
}
// returns randomised a string in the format of "rgb(r, g, b)"
function randomColor() {
    // pick a 'red' from 0 - 255
    var r = Math.floor(Math.random() * 256);
    // pick a 'green' from 0 - 255
    var g = Math.floor(Math.random() * 256);
    // pick a 'blue' from 0 - 255
    var b = Math.floor(Math.random() * 256);

    // Build String literal
    var color = (`rgb(${r}, ${g}, ${b})`);

    return color;
}
// Reset the game back to default settings
function resetGame() {
    // Generate all new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color
    pickedColor = pickColor();
    // Change color display to match
    colorDisplay.textContent = pickedColor;
    // Reset H1 Background
    h1.style.backgroundColor = "steelblue";
    // Reset Button text
    resetButton.textContent = "New Colors";
    // Reset Display Message
    messageDisplay.textContent = "";
    // change color of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}