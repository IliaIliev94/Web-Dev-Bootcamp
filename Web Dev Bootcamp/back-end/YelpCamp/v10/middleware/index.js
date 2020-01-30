const Campground = require("../models/campground");
const Comment = require("../models/comment");
const flash = require("connect-flash");

//all the middleware goes here
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    let id = req.params.id;
    // is the user logged in
    if (req.isAuthenticated()) {
        Campground.findById(id, (err, foundCampground) => {
            if (err) {
                req.flash("error", "Campground not found!");
                res.redirect("back");
            } else {
                // does the user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
    }

middlewareObj.checkCommentOwnership = (req, res, next) => {

    let comment_id = req.params.comment_id;
    if (req.isAuthenticated()) {
        Comment.findById(comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login");
}


module.exports = middlewareObj;