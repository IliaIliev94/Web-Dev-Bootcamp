// Stores a random number between 1 and 100 in a variable
let number = Math.floor((Math.random() * 100) + 1);

// Asks the user for a number
let input = prompt("Guess a number between 1 and 100");

if (number == input) {
    alert("Congratulations you guessed the number!")
}
else if (number > Number(input)) {
    input = prompt("Try again! Your guess was too low!")
}
else {
    input = prompt("Try again! Your guess was too high!");
}
