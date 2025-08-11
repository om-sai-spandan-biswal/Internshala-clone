const express = require("express") ;
const Job = require("../models/job");
const router = express.Router() ;
const Application = require("../models/application");
const req = require("express/lib/request");

router.get("/view",async (req,res) => {
    const id = res.locals.user["_id"] ;
    const applications = await Application.find({applicant : id}).populate("job") ;
    res.render("applications.ejs",{applications}) 
})

router.post("/respond/:id",async (req,res) => {
    const id = req.params.id ;
    const {action} = req.body ;
    const apply = await Application.findByIdAndUpdate(id, {status : action}) ;
    res.redirect("/jobs/manage")   
})

router.get("/:id",async (req,res)=> {
    const id = req.params.id ;
    const job = await Job.findById(id) ;
    res.render("apply.ejs",{job}) ;
}) ;

router.post("/:id",async (req,res) => {
    const jobApplied = await Application.findOne({
        job : req.params.id ,
        applicant : res.locals.user["_id"] 
    }) ;

    if(jobApplied) {
        return res.status(400).send("❌ You have already applied for this job.");
    }
        const apply = {
        job : req.params.id ,
        applicant : res.locals.user["_id"] ,
        resume : "NoT" ,
        status : "pending"
    }

    await Application.create(apply) ;

    res.redirect("/apply/view")
    
})




module.exports = router ;