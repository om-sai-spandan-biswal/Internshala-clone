const express = require("express") ;
const router = express.Router();
const profileRole = require("../utils/profileRole");
const Profile = require("../models/profile");



router.get("/", (req,res) => {
    res.render("profile.ejs")
})

router.get("/create", (req, res) => {
  res.render("createProfile.ejs", { user : res.locals.user });
});

router.post("/create",profileRole,async (req,res) => {
    const id = res.locals.profileId ;
    const profile = await Profile.findById(id).populate("user") ;
    console.log(profile) ;
    res.redirect("/")
})


router.get("/edit", (req, res) => {
  res.render("editProfile.ejs", { user : res.locals.user });
});

module.exports = router ;