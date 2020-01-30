const mongoose = require("mongoose");
const Post = require("./models/post");
const User = require("./models/user");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});



/* User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
}); */

/* Post.create({
    title: "How to cook the best burger pt. 4",
    content: "ASDJKBASHDJKBABSDJAKJSAK"
}, (err, post) => {
    User.findOne({name: "Bob Belcher"}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            user.posts.push(post);
            user.save((err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data);
                }
            })
        }
    });
}
); */

//Find user and find all of his posts
User.findOne({name: "Bob Belcher"}).populate("posts").exec((err, user) => {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

/* let newUser = new User({
    email: "charlie@brown.edu",
    name: "Charlie Brown"
}); */

/* newUser.save((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});
 */
/* let newPost = new Post({
    title: "Reflections on Apples",
    content: "They are delicious",
});

newPost.save((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
}); */

/* let newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger"
});

newUser.posts.push({
    title: "How to brew polyjuice potion",
    content: "Just kidding. Go to potions class and learn it!"
})

newUser.save((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
}) */

/* User.findOne({name: "Hermione Granger"}, (err, user) => {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "Three things I really hate",
            content: "Voldemort. Voldemort. Voldemort"
        });
        user.save((err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user)
            }
        });
    }
}); */
