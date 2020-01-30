var faker = require("faker");

greeting();

for(let i = 0; i < 10; i++) {
    console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}

function greeting() {

    console.log("====================");

    console.log("WELCOME TO MY SHOP!");

    console.log("====================");

}