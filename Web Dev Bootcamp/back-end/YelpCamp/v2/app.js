const express = require("express"),
      app = express(),
      port = 3000,
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create(
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "This is a huge Granite Hill, no bathrooms. No water. Beautiful granite!"
    }
, (err, campground) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("ADDED CAMPGROUND:");
        console.log(campground);
    }
}); */


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {campgrounds:campgrounds})
        }
    });
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    let newCampground = {
        name:name,
        image:image,
        description: description
    }

    Campground.create(newCampground, (err, newCampground) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("NEW CAMPGROUND ADDED: ");
            console.log(newCampground);
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided id
    let id = req.params.id;
    Campground.findById(id, (err, campground) => {
        if (err) {
            console.log(err);
        } 
        else {
            console.log("Found campground by id: " + campground);
            res.render("show", {campground: campground})
        }
    });
    // render the show page with that campground
});

app.listen(port, () => console.log("YelpCamp server has started"));