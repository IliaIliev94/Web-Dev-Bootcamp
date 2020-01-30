const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, (req, res) => {
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
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

//Edit form route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    let id = req.params.id;
    Campground.findById(id, (err, foundCampground) => {
        res.render("campgrounds/edit", {foundCampground: foundCampground});
    })
    
});

//Update route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    let id = req.params.id;
    let data = req.body.campground;
    Campground.findByIdAndUpdate(id, data, (err, updatedCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + id);
        }
    });
});

//Destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    let id = req.params.id;
    Campground.findByIdAndDelete(id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + id);
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;