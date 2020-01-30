let answer = prompt("Are we there yet?");

let containsYes = answer.includes("yes");

while (!containsYes) {
    answer = prompt("Are we there yet?");
    containsYes = answer.includes("yes")
}

alert("YAY WE MADE IT!!!");