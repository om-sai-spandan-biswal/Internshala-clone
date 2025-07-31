const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type : Schema.Types.ObjectId ,
    ref : "User"
  },
  companyName : String ,
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  job_role: {
    type: String,
    enum: [
      "fullstack",
      "backend",
      "frontend",
      "data science",
      "mobile app",
      "mobile app",
      "graphic design",
      "content writing",
      "digital marketing",
      "seo",
      "ui/ux design",
      "ciber security",
      "cloud computing",
      "others",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
