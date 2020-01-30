const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");

//COMMENT ROUTES

//Campgrounds Route
router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds:campgrounds});
        }
    });
});

// Create new campground
router.post("/", isLoggedIn, (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    let author = {
        id: req.user.id,
        username: req.user.username
    }
    let newCampground = {
        name:name,
        image:image,
        description: description,
        author: author
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

// Form for new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// Show route
router.get("/:id", (req, res) => {
    // find the campground with provided id
    let id = req.params.id;
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log("Found campground by id: " + campground);
            
            res.render("campgrounds/show", {campground: campground})
        }
    });
    // render the show page with that campground
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;