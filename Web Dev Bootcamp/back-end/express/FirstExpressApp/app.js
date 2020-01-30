const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hi There!"));

app.get("/bye", (req, res) => res.send("Goodbye!"));

app.get("/dog", (req, res) => res.send("MEOW!"));

app.get("/r/:subredditName", (req, res) => {
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
});

app.get("/r/:subreditName/comments/:id/:title", (req, res) => {
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!");
}); 

app.get("*", (req, res) => res.send("YOU ARE A STAR!"));

app.listen(3000, process.env.IP, () => console.log("Server has started"));