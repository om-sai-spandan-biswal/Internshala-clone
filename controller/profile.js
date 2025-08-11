const Profile = require("../models/profile");
const User = require("../models/user");

module.exports.getProfile = async (req, res) => {
  const user = await res.locals.user.populate("profile");
  res.render("profile.ejs", { user: user });
} ;

module.exports.createPage = (req, res) => {
  res.render("createProfile.ejs", { user: res.locals.user });
};

module.exports.link_user = async (req, res) => {
  const id = res.locals.profileId;
  const profile = await Profile.findById(id).populate("user");
  const user = profile.user;
  const updatedUser = await User.findByIdAndUpdate(
    user["_id"],
    { profile: profile["_id"] },
    { new: true }
  );
  res.redirect("/");
};

module.exports.editPage = async (req, res) => {
  const user = await res.locals.user.populate("profile");
  res.render("editProfile.ejs", { user: user });
};

module.exports.updateProfile = async (req, res) => {
  const id = req.params.id;
  const data = await Profile.findById(id);
  const image = req.files["image"]?.[0];
  const resume = req.files["resume"]?.[0];
  await Profile.findByIdAndUpdate(id, {
    ...req.body,
    image: image?.path || data.image,
    resume: resume?.path || data.resume,
  });
  res.redirect("/profile");
};
