const express = require("express");
const app = express();
const port = 3000;

const request = require("request");


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});



app.get("/results", (req, res) => {
    let movie = req.query.movie;
    let url = "http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb";
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            if(data["Search"] != undefined) {
                res.render("results", {data: data});
            }
            else {
                res.send("No such movie!");
            }
        }
        else {
            console.log(error);
        }
    });
});

app.listen(port, () => console.log("Server has started!"));