const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const user = {
  name: "Shri Bihari ji",
  email: "vrindavan@email.com",
  role: "jobseeker", //jobseeker recruiter
};

//  const user = null ;

const jobs = [
  {
    _id: "1",
    title: "Software Engineer",
    company: "D.E.C",
    location: "Odisha, India",
    description: "We need a bhakt and also a coder. For seva purpose.",
    salary: "100,000 - 180,000",
  },
  {
    _id: "2",
    title: "Backend Developer",
    company: "BhaktiTech",
    location: "Varanasi, India",
    description:
      "Looking for a Node.js backend developer with bhakti towards Hari.",
    salary: "120,000 - 200,000",
  },
  {
    _id: "3",
    title: "Frontend Developer",
    company: "Hari Devs",
    location: "Mathura, India",
    description:
      "React developer needed to build interfaces for Hari's leela streaming app.",
    salary: "90,000 - 150,000",
  },
  {
    _id: "4",
    title: "DevOps Engineer",
    company: "Shree Cloud",
    location: "Dwarka, India",
    description:
      "Deploying seva microservices with docker/k8s. Bhakti mindset a must.",
    salary: "140,000 - 210,000",
  },
  {
    _id: "5",
    title: "ML Engineer",
    company: "VaishnavAI",
    location: "Puri, India",
    description:
      "Train ML models to detect bhajan lyrics. Should love Lord Harivansh.",
    salary: "160,000 - 250,000",
  },
  {
    _id: "6",
    title: "Full Stack Developer",
    company: "SevaStack",
    location: "Ayodhya, India",
    description:
      "Build scalable seva platforms. MERN stack and pure bhakti required.",
    salary: "130,000 - 220,000",
  },
  {
    _id: "7",
    title: "Data Analyst",
    company: "HariData",
    location: "Ujjain, India",
    description:
      "Analyze data for devotees’ app. Bhakta with SQL & Excel skills.",
    salary: "80,000 - 140,000",
  },
  {
    _id: "8",
    title: "Security Engineer",
    company: "DivineSecure",
    location: "Raman Reti, India",
    description:
      "Protect devotee data with penetration testing. Ethical hacker preferred.",
    salary: "150,000 - 230,000",
  },
  {
    _id: "9",
    title: "Mobile App Developer",
    company: "BhajanMobiles",
    location: "Barsana, India",
    description:
      "React Native dev to build mobile bhajan platforms. Seva attitude a plus.",
    salary: "100,000 - 170,000",
  },
  {
    _id: "10",
    title: "AI Researcher",
    company: "ShriAI",
    location: "Nathdwara, India",
    description:
      "Research AI to simulate Harivansh vaani. Only true bhakts apply.",
    salary: "180,000 - 300,000",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { user });
});

app.get("/jobs", (req, res) => {
  res.render("browseJobs.ejs", { user, jobs });
});

app.get("/jobs/post", (req, res) => {
  res.render("postJob.ejs", { user });
});

app.get("/jobs/:id", (req, res) => {
  const id = req.params.id;
  const job = jobs.find((job) => job._id === id);
  res.render("jobDetails.ejs", { user, job });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", { user });
});


app.get("/profile/create", (req, res) => {
  res.render("createProfile.ejs", { user });
});

app.get("/profile/edit", (req, res) => {
  res.render("editProfile.ejs", { user });
});

app.listen(PORT, () => {
  mongoose
    .connect("mongodb://localhost:27017/internshala-clone")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
  console.log(`Server is running on http://localhost:${PORT}`);
});
