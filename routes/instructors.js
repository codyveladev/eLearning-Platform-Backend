const express = require("express");
const instructors = express.Router();

//Models
const userModels = require("../Models/User");

/**
 * @type POST
 * @route /instructor/register
 * @desc Registers a new instructor in the database
 */

instructors.post("/register", async (req, res) => {
  let newInstructorInfo = req.body;
  newInstructorInfo.isInstructor = true;

  try {
    let createdInstructor = await userModels.create(newInstructorInfo);
    createdInstructor.save();
    res.send(`Instructor ID: ${createdInstructor._id} Created`);
  } catch (error) {
    if (e) res.status(400).send("Error registering user...");
  }
});

module.exports = instructors; 
