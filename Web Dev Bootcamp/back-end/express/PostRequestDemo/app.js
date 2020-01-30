const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const port = 3000;

let friends = ["Tony", "Miranda", "Justin", "Piere", "Lily"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends})
});

app.post("/addfriend", (req, res) => {
    let newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(port, () => console.log("Server has started!"));