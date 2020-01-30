const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hi there, welcometo my assignment!"));

app.get("/speak/:animal", (req, res) => {
    let sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "'...'"
    }
    let animal = req.params.animal.toLowerCase();
    let action;
    
    res.send("The " + animal + " says '" + sounds[animal] + "'");
});

app.get("/repeat/:word/:number", (req, res) => {
    let greetings = "";
    let number = req.params.number;
    let word = req.params.word;
    for(let i = 0; i < number; i++) {
        if (i === number - 1) {
            greetings += word;
        }
        else {
            greetings += word + " ";
        }
    }
    res.send(greetings);
});

app.get("*", (req, res) => res.send("Sorry page not found...What are you doing with your life?"));

app.listen(port, () => console.log("Server has starter!"));