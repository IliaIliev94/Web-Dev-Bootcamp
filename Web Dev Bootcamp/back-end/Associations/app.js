const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


//USER - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

const User = mongoose.model("User", userSchema);


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

User.findOne({name: "Hermione Granger"}, (err, user) => {
    if (err) {
        /* console.log(err); */
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
});
