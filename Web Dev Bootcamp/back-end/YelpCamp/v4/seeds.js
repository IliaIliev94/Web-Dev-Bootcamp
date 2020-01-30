const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Blablabla"
    },
    {
        name: "Dessert Messa",
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Blablabla"
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Blablabla"
    }
]

function seedDB() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Campgrounds removed!");
        // add campgrounds
        data.forEach(seed => {
            Campground.create(seed, (err, newCampground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        },
                        (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                newCampground.comments.push(comment);
                                newCampground.save();
                                console.log("created new comment!");
                            }
                        }
                    )
                }
            });
        });
    });
    
}

module.exports = seedDB;

