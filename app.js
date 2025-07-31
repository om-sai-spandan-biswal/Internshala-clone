const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const methodOverride = require('method-override') ;
const verifyLogin = require("./utils/userSignHandel");

const cookieParser = require("cookie-parser");
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const jobsRoute = require("./routes/jobs");
const applyRoute = require("./routes/apply") ;

app.use(verifyLogin, (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});



app.get("/", (req, res) => {
  res.render("index.ejs", { user: res.locals.user });
});

app.use("/", authRoute);
app.use("/profile", profileRoute);
app.use("/jobs", jobsRoute);
app.use("/apply",applyRoute) ;

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", { user: res.locals.user });
});

app.listen(PORT, () => {
  mongoose
    .connect("mongodb://localhost:27017/internshala-clone")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
  console.log(`Server is running on http://localhost:${PORT}`);
});
