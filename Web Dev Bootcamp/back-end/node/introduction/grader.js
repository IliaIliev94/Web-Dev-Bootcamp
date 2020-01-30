let scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));

function average(scores) {
    let sum = 0;
    let length = scores.length;
    for(let i = 0; i < length; i++) {
        sum += scores[i];
    }
    let average = Math.round(sum/length);
    return (average);
}