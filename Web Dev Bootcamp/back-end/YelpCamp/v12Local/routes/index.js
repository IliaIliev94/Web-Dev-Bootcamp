const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//Landing page
router.get("/", (req, res) => {
    res.render("landing");
});


//AUTH ROUTES

//Register form route
router.get("/register", (req, res) => {
    res.render("register");
});

//Register new user
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Login form route
router.get("/login", (req, res) => {
    res.render("login");
});

//Login user
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
});

//Logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;