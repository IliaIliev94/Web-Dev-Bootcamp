const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//COMMENTS ROUTES

//New comment form
router.get("/new", isLoggedIn,  (req, res) => {
    let id = req.params.id;
    console.log(id);
    Campground.findById(id, (err, foundCampground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//Create comments
router.post("/", isLoggedIn, (req, res) => {
    let id = req.params.id;
    Campground.findById(id, (err, foundCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, newComment) => {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    console.log(newComment);
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    console.log("COMMENTS:" + foundCampground);
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;