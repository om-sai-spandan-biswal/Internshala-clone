const express = require("express") ;
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtpass = process.env.JWT_SECRATE ;


router.get("/signup", (req, res) => {
  res.render("signup.ejs",{ user: res.locals.user });
});

router.post("/signup",async (req, res) => {
  const data = req.body;
  data.password = await bcrypt.hash(data.password,10) ;
  const user = await User.create(data);
  const token = jwt.sign({ id: user._id }, jwtpass, { expiresIn: "7d" });
  res.cookie("token", token,{
    httpOnly: true,
    sameSite: "Strict" // Adjust as necessary
  })
  res.redirect("/dashboard");
});


router.get("/login", (req, res) => {
  res.render("login.ejs",{ user: res.locals.user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body ;
  const user = await User.findOne({email : email});
  const isMatch = await bcrypt.compare(password,user.password) ;
  if (!user) {
    return res.status(400).send("User not found");
  } else if(!isMatch) {
    return res.status(400).send("Invalid password");  
  } else{
    const token = jwt.sign({ id: user._id }, jwtpass, { expiresIn: "7d" });
    res.cookie("token", token,{
      httpOnly: true,
      sameSite: "Strict" 
    })
  }           
  res.redirect("/dashboard");
});     


router.post("/logout", (req,res) => {
    res.clearCookie("token",{
      httpOnly: true,
      sameSite: "Strict" // Adjust as necessary
    })
    res.redirect("/");
})

module.exports = router ;