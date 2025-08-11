const express = require("express");
const router = express.Router();
const profileRole = require("../utils/profileRole");
const Profile = require("../models/profile");
const User = require("../models/user");
const upload = require("../utils/uploads");
const profileControl = require("../controller/profile");
const asyncWarp = require("../utils/asyncWorp");

router.get("/", asyncWarp(profileControl.getProfile));

router.get("/create", asyncWarp(profileControl.createPage));

router.patch(
  "/link-user",
  upload.single("image"),
  profileRole,
  asyncWarp(profileControl.link_user)
);

router.get("/edit", asyncWarp(profileControl.editPage));

router.put(
  "/edit/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  asyncWarp(profileControl.updateProfile)
);

router.get("/:id", async (req, res) => { // on working
  const user = await User.findById(req.params.id).populate("profile");
  res.render("profile.ejs", { user: user });
});

module.exports = router;
