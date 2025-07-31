const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const applicationSchema = new Schema({
    job : {
        type : Schema.Types.ObjectId ,
        ref : "Job",
        required : true
    },
    applicant : {
        type : Schema.Types.ObjectId ,
        ref : "User" ,
        required : true
    },
    resume : {
        type : String ,
        // required : true
    },
    status : {
        type : String ,
        enum : ["pending","accpected","rejected"]   ,
    },
    appliedAt : {
        type : Date ,
        default : Date.now()
    }

})

const Application = mongoose.model("Application",applicationSchema) ;

module.exports = Application ;
