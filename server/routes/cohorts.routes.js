
const Cohort = require("../models/Cohort.model");

const cohorts = require("../cohorts.json");


const router = require('express').Router();
//COHORT ROUTES
// 2.3.1. GET - Returns all the cohorts from the static students array
router.get("/fromJson", (req, res) => {
    res.json(cohorts);
  });

// 2.3.8 POST /cohorts - Creates a new cohort
  router.post("/", async (req, res) => {
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

// 2.3.9. GET /cohorts - Retrieves all of the cohorts in the database collection
router.get("/", async (req, res) => {
  try {
    const allCohorts = await Cohort.find()
    res.status(200).json(allCohorts)
  }
  catch (error) {
    res.status(500).json({ error, message: "Failed to get all cohorts" })
  }
})

  // 2.3.10 GET /cohorts/:cohortId - Retrieves a specific cohort by id
  router.get("/:cohortId", async (req, res) => {
    try {
      const cohortId = req.params.cohortId;
      const oneCohort = await Cohort.findById(cohortId);
      res.status(200).json(oneCohort);
    } catch (error) {
      res.status(500).json({ error, message: "failed to get the cohort" });
    }
  });

  // 2.3.11. PUT /cohorts/:cohortId - Updates a specific cohort by id
  router.put("/:cohortId", async (req, res) => {
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
  
  // 2.3.12 DELETE /cohorts/:cohortId - Deletes a specific cohort by id
  router.delete("/:cohortId", async (req, res) => {
  try {
      const cohortId = req.params.cohortId;
      const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
      if (!deletedCohort) {
        return res.status(404).json({ error, message: "Cohort not found." })
      }
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error, message: "Failed to delete cohort." });
    }
  });

  module.exports = router;