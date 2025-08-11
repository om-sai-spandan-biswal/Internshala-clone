const express = require("express") ;
const router = express.Router() ;

const Job = require("../models/job") ;
const Application = require("../models/application");

router.get("/", async (req, res) => {
  const jobs =  await Job.find() ;
  res.render("browseJobs.ejs", { user : res.locals.user, jobs });
});

router.get("/manage", async (req,res) => {
  const id = res.locals.user["_id"]
  const jobs = await Job.find({company : id}) ;
  res.render("manageJobs.ejs",{jobs})
})

router.get("/post", (req, res) => {
  res.render("postJob.ejs", { user : res.locals.user });
});
async (req, res) => {
  const user = await res.locals.user.populate("profile");
  res.render("profile.ejs", { user: user });
}
router.get("/:id",async (req,res) => {
  const id = req.params.id ;
  const job = await Job.findById(id) ;
  res.render("jobDetails.ejs",{job})
}) ;

router.get("/:id/applicants", async (req,res) => {
  const id = req.params.id ;
  const job = await Job.findById(id) ;
  const applicants = await Application.find({job : id}).populate("applicant") ;
  res.render("viewApplicant.ejs",{applicants, jobTitle : job.title})
})

router.post("/post",async (req,res) => {
   const user = await res.locals.user.populate("profile") ;
   const data = {
    ...req.body,company : user["_id"], companyName : user.profile["companyName"]
   }
   await Job.create(data) ;
  res.redirect("/") ;
})

router.delete("/:id", async(req,res) => {
    const id = req.params.id ;
    await Application.deleteMany({job : id}) ;
    await Job.findByIdAndDelete(id) ;
    res.redirect("/jobs/manage")
})



// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   const job = jobs.find((job) => job._id === id);
//   res.render("jobDetails.ejs", { user : res.locals.user, job });
// });

module.exports = router ;