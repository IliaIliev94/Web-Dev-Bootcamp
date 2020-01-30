const express = require("express"),
      app = express(),
      port = 3000,
      mongoose = require("mongoose"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user"),
      methodOverride = require("method-override"),
      flash = require("connect-flash"),
      seedDB = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes = require("./routes/comments"),
      authRoutes = require("./routes/index");
      

mongoose.connect("mongodb://localhost:27017/yelp_camp_v7", {useNewUrlParser: true});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


seedDB();

app.set("view engine", "ejs");

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, () => console.log("YelpCamp server has started"));