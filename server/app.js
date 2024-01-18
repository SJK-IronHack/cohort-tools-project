const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");




const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE (aka Express.js functions)
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const indexRoutes = require('./routes/index.routes.js')
app.use('/api', indexRoutes)

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (_, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});














// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// CONNECT MONGOOSE TO DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
