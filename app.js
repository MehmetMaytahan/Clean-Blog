const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");

const app = express();

const Post = require("./modals/Post");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get("/", async (req, res) => {
  const posts = await Post.find({}).sort("-dateCreated");
  res.render("index", { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add_post");
});

app.post("/add", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post-detail", { post });
});

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://127.0.0.1/clean-blog-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) throw err;
    console.log("Connected to MongoDB");
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
);
