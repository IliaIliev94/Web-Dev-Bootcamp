printReverse(["a", "b", "c"]);
console.log(isUniform(["b", "b", "b"]));
console.log(sumArray([-5, 100]));
console.log(max([10, 3, 10, 4]));


function printReverse(something) {
    for(let i = something.length - 1; i >= 0; i--) {
        console.log(something[i]);
    }
}

function isUniform(array) {
    let first = array[0];
    for(let i = 0; i < array.length; i++) {
            if (array[i] !== first) {
                return false;
            }
    }
    return true;
}

function sumArray(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function max(array) {
    let max = Number.MIN_VALUE;
    for(let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}
