const express = require("express");
const instructors = express.Router();
const bcrypt = require("bcrypt");

//Models
const userModels = require("../models/User.js");

/**
 * @type POST
 * @route /instructor/register
 * @desc Registers a new instructor in the database
 */
instructors.post("/register", async (req, res) => {
  //Get data from body
  let newInstructorInfo = req.body;
  //Instructor Route
  newInstructorInfo.isInstructor = true;

  //Encrypt Password
  newInstructorInfo.password = encryptPassword(newInstructorInfo.password);

  try {
    let createdInstructor = await userModels.create(newInstructorInfo);
    createdInstructor.save();
    res.send(`Instructor ID: ${createdInstructor._id} Created`);
  } catch (error) {
    if (e) res.status(400).send("Error registering user...");
  }
});

//Helper Functions
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

module.exports = instructors;
