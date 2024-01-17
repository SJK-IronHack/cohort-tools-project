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


//STUDENT ROUTES

// 2.3.1. GET - Returns all the cohorts from the static students array
app.get("/api/studentsFromJson", (req, res) => {
   res.json(students);
});

// 2.3.2. POST - Creates a new student 
app.post("/api/students", async (req, res) => {
  const payload = req.body
  try {
    const newStudent = await Student.create(payload);
    res.status(201).json(newStudent);
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Failed to create a student." })
  }
})

// 2.3.3.  GET  /students - Retrieves all students from the database
app.get("/api/students", async (req, res) => {
  try {
    const allStudents = await Student.find()
    res.status(200).json(allStudents)
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get all students." })
  }
})

//2.3.4. GET /api/students/cohort/:cohortId - Retrieves all of the students from a given cohort
app.get("/api/students/cohort/:cohortId", async (req, res) => {
  try {
    const cohortId = req.params.cohortId;
    const allStudents = await Cohort.findById(cohortId);
    if (!allStudents) {
      return res.status(404).json({ error, message: "Students not found." })
    }
    res.status(200).json(allStudents);
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get students of the cohort." })
  }
})

// 2.3.5. GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const oneStudent = await Student.findById(studentId);
    if (!oneStudent) {
      return res.status(404).json({ error, message: "Student not found." })
    }
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get the student." });
  }
});

// 2.3.6. PUT /api/students/:studentId - Updates a specific student by id
app.put("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error, message: "Student not found." })
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error, message: "Failed to update the student information." });
  }
});

// 2.3.7. DELETE /api/students/:studentId - Deletes a specific student by id
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error, message: "Student not found." })
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error, message: "Failed to delete student." });
  }
});




//COHORT ROUTES
// // 2.3.1. GET - Returns all the cohorts from the static students array
// app.get("/api/cohortsFromJson", (req, res) => {
//   res.json(cohorts);
// });

  // 2.3.8 POST /api/cohorts - Creates a new cohort
  app.post("/api/cohorts", async (req, res) => {
    const payload = req.body
    try {
      const newCohort = await Cohort.create(payload);
      res.status(201).json(newCohort);
    }
    catch (error) {
      console.log(error)
      res.status(500).json({ error, message: "Failed to create a Cohort" })
    }
  })
  // 2.3.9. GET /api/cohorts - Retrieves all of the cohorts in the database collection

app.get("/api/cohorts", async (req, res) => {
  try {
    const allCohorts = await Cohort.find()
    res.status(200).json(allCohorts)
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get all cohorts" })
  }
})

  // 2.3.10 GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
  app.get("/api/cohorts/:cohortId", async (req, res) => {
    try {
      const cohortId = req.params.cohortId;
      const oneCohort = await Cohort.findById(cohortId);
      res.status(200).json(oneCohort);
    } catch (error) {
      res.status(500).json({ error, message: "failed to get the cohort" });
    }
  });
  // 2.3.11. PUT /api/cohorts/:cohortId - Updates a specific cohort by id
  app.put("/api/cohorts/:cohortId", async (req, res) => {
    try {
      const cohortId = req.params.cohortId;
      const updatedCohortData = req.body; 
  
      const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, updatedCohortData, { new: true });
  
      if (!updatedCohort) {
        return res.status(404).json({ message: "Cohort not found" });
      }
  
      res.status(200).json(updatedCohort);
    } catch (error) {
      res.status(500).json({ error, message: "Failed to update the cohort" });
    }
  });
  // 2.3.12 DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
  app.delete("/api/cohorts/:cohortId", async (req, res) => {
    try {
      const studentId = req.params.cohortId;
      const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
      if (!deletedCohort) {
        return res.status(404).json({ error, message: "Cohort not found." })
      }
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error, message: "Failed to delete cohort." });
    }
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
