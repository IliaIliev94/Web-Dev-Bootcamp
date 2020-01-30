const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user"),
      methodOverride = require("method-override"),
      flash = require("connect-flash"),
      favicon = require("serve-favicon"),
      path = require("path");
      seedDB = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes = require("./routes/comments"),
      authRoutes = require("./routes/index");
      
      

mongoose.connect("mongodb+srv://Ilia:xs940311@cluster0-yiaor.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(Error, err.message);
});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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
app.set( "port", ( process.env.PORT || 5000 ));

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(app.get("port"), () => console.log("YelpCamp server has started"));