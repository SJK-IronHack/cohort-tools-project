const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const Cohort = require("./models/Cohort.model.js");
const Student = require("./models/Student.model.js");

const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohorts = require("./cohorts.json");
const students = require("./students.json");


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


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
app.get("/docs", (_, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// app.get("/api/cohorts", (_, res) => {
//   res.json(cohorts);
// });




//  GET  /cohorts - Retrieve all cohorts from the database
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});
//STUDENT ROUTS

// 2.3.1. Return all the cohorts from the static students array
app.get("/api/students", (_, res) => {
  res.json(students);
});

// 2.3.2. | Create the a new student 
app.post("/api/students", async (req, res) => {
  const payload = req.body
  try {
    const newStudent = await Student.create(payload);
    res.status(201).json(newStudent);
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Failed to create a student" })
  }
})

// 2.3.3  GET  /students - Retrieve all students from the database
// app.get("/api/students", (req, res) => {
//   Student.find({})
//     .then((students) => {
//       console.log("Retrieved students ->", students);
//       res.json(students);
//     })
//     .catch((error) => {
//       console.error("Error while retrieving students ->", error);
//       res.status(500).send({ error: "Failed to retrieve students" });
//     });
// });

app.get("/api/students", async (req, res) => {
  try {
    const allStudents = await Student.find()
    res.status(200).json(allStudents)
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get all students" })
  }
})

//2.3.4. GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.id;
    const allStudents = await Cohort.findById(cohortId);
    if (!allStudents) {
      return res.status(404).json({ error, message: "students not found" })
    }
    res.status(200).json(allStudents);
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get students of the cohort" })
  }
})

// 2.3.5.GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", async (req, res) => {
  const oneStudent = await Student.findById(studentId)
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// CONNECT MONGOOSE TO DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
