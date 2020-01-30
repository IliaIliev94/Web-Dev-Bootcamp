const express = require("express"),
      app = express(),
      port = 3000,
      mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      seedDB = require("./seeds");
      

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

seedDB();

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
            console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds:campgrounds})
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
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
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

//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", (req, res) => {
    let id = req.params.id;
    Campground.findById(id, (err, foundCampground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
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


app.listen(port, () => console.log("YelpCamp server has started"));