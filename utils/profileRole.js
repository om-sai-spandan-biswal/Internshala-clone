const Profile = require("../models/profile") ;
const upload = require("./uploads");

module.exports = profileRole = async (req, res, next) => {
  const user = res.locals.user;
  const {
    image,
    bio,
    skills,
    education,
    resume,
    companyName,
    website,
    domains,
  } = req.body;
  console.log(req.file)

  const role = user["role"];

  if (role === "jobseeker") {
    const profile = {
      user: user["_id"],
      bio: bio,
      role : role ,
      image: image,
      // for jobseeker
      skills: skills,
      education: education,
      resume: resume,
    };
     const profileOne = await Profile.create(profile) ;
     res.locals.profileId = profileOne["_id"] ;
     
  } else if (role === "recruiter") {
    const profile = {
      user: user["_id"],
      bio: bio,
      role : role,
      image: image,
      // for recruter
      companyName: companyName,
      website: website,
      domain: domains,
    };
    const profileOne = await Profile.create(profile) ;
    res.locals.profileId = profileOne["_id"] ;
  } else {
    res.send("Somthing is wrong. your ROLE is not") ;
  }

  next()
};
