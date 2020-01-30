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
            res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, () => {
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
    failureRedirect: "/login"
}), (req, res) => {
});

//Logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;