const express = require("express") ;
const router = express.Router();
const User = require("../models/user");

















app.get("/login", (req, res) => {
  res.render("login.ejs", { user });
});

app.post("/login", (req, res) => {
  // Handle login logic here
  res.redirect("/dashboard");
});     


app.get("/signup", (req, res) => {
  res.render("signup.ejs", { user });
});

app.post("/signup", (req, res) => {
  // Handle signup logic here
  res.redirect("/dashboard");
});

app.post("/logout", (req,res) => {
    // Handle logout logic here
    res.redirect("/");
})