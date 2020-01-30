const express = require("express"),
      app = express(),
      methodOveride = require("method-override"),
      bodyParser = require("body-parser"),
      expressSanitizer = require("express-sanitizer"),
      mongoose = require("mongoose"),
      port = 3000;

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOveride("_method"));

//MONGOOSE MODEL CONFIG
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.post("/blogs", (req, res) => {
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.redirect("/blogs/new");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    Blog.findById(id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    });
});

app.get("/blogs/:id/edit", (req, res) => {
    let id = req.params.id;
    Blog.findById(id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", (req, res) => {
    let id = req.params.id;
    let newBlog = req.body.blog;
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(newBlog);
    Blog.findByIdAndUpdate(id, newBlog,  (err, editBlog) => {
        if (err) {
            res.redirect("/blogs/:id/edit");
        }
        else {
            console.log(editBlog);
            res.redirect("/blogs/" + id);
        }
    });
});

app.delete("/blogs/:id", (req, res) => {
    let id = req.params.id;
    Blog.findByIdAndRemove(id, (err, destroyedBlog) => {
        if (err) {
            res.redirect("/blogs/" + destroyedBlog._id);
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.listen(port, () => console.log("Server has started!"));