const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

//COMMENTS ROUTES

//New comment form
router.get("/new", middleware.isLoggedIn,  (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
    let id = req.params.id;
    Campground.findById(id, (err, foundCampground) => {
        if (err) {
            req.flash("error", "Something went wrong!");
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
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// Comment edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    let campground_id = req.params.id;
    let comment_id = req.params.comment_id;
    Comment.findById(comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: campground_id, comment: foundComment});
        }
    });
});

// Comment update
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    let id = req.params.comment_id;
    let text = req.body.comment;
    Comment.findByIdAndUpdate(id, text, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    let id = req.params.comment_id;
    Comment.findByIdAndDelete(id, (err) => {
        if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;