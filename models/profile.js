const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId ,
        ref : "User",
        required : true,
        unique : true,
    },
    bio :{
        type : String,
        required : true,
    } ,
    image : {
        type : String ,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngimg.com%2Fimage%2F38188&psig=AOvVaw0aBP2ytZPwNdE_NMKdaVOA&ust=1753265587366000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCSr7id0I4DFQAAAAAdAAAAABAE"
    },
    role : {
        type : String,
        enum : ["jobseeker", "recruiter"],
        required : true,
    },
     // For jobseeker ------------------->
    skills : String ,
    education : String,
    resume : String, 
    apply : [{
        type : Schema.Types.ObjectId ,
        ref : "Job"
    }] ,
    // For recruiter -------------------->
    companyName : String ,
    website : String,
    domain : String,
    
})

const Profile = mongoose.model("Profile",profileSchema) ;
module.exports = Profile;

