function isEven(num) {
    if (num % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}

console.log(isEven(22));

function factorial(num) {
    let sum = 1;
    for(let i = 2; i <= num; i++) {
        sum *= i;
    }
    return sum;
}

console.log(factorial(0));

function kebabToSnake(word) {
    let string = "";
    for(let i = 0; i < word.length; i++) {
        if (word[i] === '-') {
            string += "_"
        }
        else {
            string += word[i];
        }
    }
    return string;
}

console.log(kebabToSnake("blah"));

function kebabToSnakeTwo(word) {
    let string = word.replace(/-/g, "_");
    return string;
}

console.log(kebabToSnakeTwo("dogs-are-awesome"));