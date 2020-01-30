let age = prompt();
let isSquare = age ** 1/2 + "";

if (age < 0) {
    console.log("Error!");
}

else if (age == 21) {
    console.log("happy 21st birthday!");
}

if (age % 2 != 0) {
    console.log("your age is odd!");
}

if (isSquare.length == 1) {
    console.log("perfect square");
}


