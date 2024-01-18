//STUDENT ROUTES

const Student = require("../models/Student.model");
const router = require('express').Router();

const students = require("../students.json");



// 2.3.1. GET - Returns all the cohorts from the static students array
router.get("/fromJson", (req, res) => {
    res.json(students);
 });
 
 // 2.3.2. POST - Creates a new student 
 router.post("/", async (req, res) => {
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
 
 // 2.3.3. GET  /students - Retrieves all students from the database
 router.get("/", async (req, res) => {
   try {
     const allStudents = await Student.find().populate("cohort") 
     res.status(200).json(allStudents)
   }
   catch (error) {
     res.status(500).json({ error, message: "Failed to get all students." })
   }
 })
 
 //2.3.4. GET /students/cohort/:cohortId - Retrieves all of the students from a given cohort
 router.get("/cohort/:cohortId", async (req, res) => {
   try {
     const cohortId = req.params.cohortId;
     const allStudents = await Student.find({ cohort: cohortId }).populate("cohort"); 
     if (!allStudents) {
       return res.status(404).json({ error, message: "Students not found." })
     }
     res.status(200).json(allStudents);
   }
   catch (error) {
     res.status(500).json({ error, message: "Failed to get students of the cohort." })
   }
 })
 
 // 2.3.5. GET /students/:studentId - Retrieves a specific student by id
 router.get("/:studentId", async (req, res) => {
   try {
     const studentId = req.params.studentId;
     const oneStudent = await Student.findById(studentId).populate("cohort"); 
     if (!oneStudent) {
       return res.status(404).json({ error, message: "Student not found." })
     }
     res.status(200).json(oneStudent);
   } catch (error) {
     res.status(500).json({ error, message: "Failed to get the student." });
   }
 });
 
 // 2.3.6. PUT /students/:studentId - Updates a specific student by id
 router.put("/:studentId", async (req, res) => {
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
 
 // 2.3.7. DELETE /students/:studentId - Deletes a specific student by id
 router.delete("/:studentId", async (req, res) => {
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
 

 module.exports = router;