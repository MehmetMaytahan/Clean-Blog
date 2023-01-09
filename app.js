const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/home", (req, res) => {
  res.render("post");
});

app.get("/add", (req, res) => {
  res.render("add_post");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
