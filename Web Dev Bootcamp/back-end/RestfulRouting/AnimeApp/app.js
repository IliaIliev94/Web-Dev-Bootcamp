const express = require("express"),
      app = express();
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer"),
      port = 3000;

mongoose.connect("mongodb://localhost:27017/anime_app", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

const animeSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    rating: Number
});

const Anime = mongoose.model('anime', animeSchema);

app.get("/", (req, res) => {
    res.redirect("/animes");
});

app.get("/animes", (req, res) => {
    let animes = Anime.find({}, (err, foundAnimes) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {animes: foundAnimes});
        }
    })
});

app.get("/animes/new", (req, res) => {
    res.render("new");
});

app.get("/animes/:id", (req, res) => {
    let id = req.params.id;
    Anime.findById(id, (err, foundAnime) => {
        if (err) {
            res.redirect("/animes");
        } else {
            res.render("show", {anime: foundAnime});
        }
    });
});

app.post("/animes", (req, res) => {
    req.body.anime.body = req.sanitize(req.body.anime.body);
    let newAnime = req.body.anime;
    Anime.create(newAnime, (err, createdAnime) => {
        if (err) {
            res.redirect("/animes/new");
        } else {
            res.redirect("/animes/" + createdAnime._id);
        }
    });
});

app.get("/animes/:id/edit", (req, res) => {
    let id = req.params.id;
    Anime.findById(id, (err, editAnime) => {
        if (err) {
            res.redirect("/animes");
        } else {
            res.render("edit", {anime: editAnime});
        }
    })
});

app.put("/animes/:id", (req, res) => {
    req.body.anime.body = req.sanitize(req.body.anime.body);
    let id = req.params.id;
    let editAnime = req.body.anime;
    Anime.findByIdAndUpdate(id, editAnime, (err, updatedAnime) => {
        if (err) {
            res.redirect("/animes/" + id + "/edit")
        } else {
            res.redirect("/animes/" + updatedAnime._id)
        }
    });
});

app.delete("/animes/:id", (req, res) => {
    let id = req.params.id;
    Anime.findByIdAndDelete(id, (err) => {
        if (err) {
            res.redirect("/animes/" + id);
        } else {
            res.redirect("/animes");
        }
    });
});

app.listen(port, () => console.log("Server has started!"));