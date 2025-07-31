const express = require("express");
const router = express.Router();
const profileRole = require("../utils/profileRole");
const Profile = require("../models/profile");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const user = await res.locals.user.populate("profile") ;
  res.render("profile.ejs",{user :user});
});



router.get("/create", (req, res) => {
  res.render("createProfile.ejs", { user: res.locals.user });
});

router.patch("/link-user", profileRole, async (req, res) => {
  const id = res.locals.profileId;
  const profile = await Profile.findById(id).populate("user");
  const user = profile.user;
  const updatedUser = await User.findByIdAndUpdate(user["_id"],{ profile: profile["_id"]},{new : true});
  res.redirect("/");
});



router.get("/edit", async (req, res) => {
  const user = await res.locals.user.populate("profile") ;
  res.render("editProfile.ejs", { user: user});
});

router.put("/edit/:id",async (req,res) => {
  const id = req.params.id ;
  console.log(id,req.body)
  const data = await Profile.findByIdAndUpdate(id,req.body);
  res.redirect("/profile")
})

router.get("/:id", async (req,res) => {
  const user = await User.findById(req.params.id).populate("profile") ;
  res.render("profile.ejs",{user : user})
})

module.exports = router;
