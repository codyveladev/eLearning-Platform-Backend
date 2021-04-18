const express = require("express");
const courses = express.Router();

//Auth Middleware
const protect = require("../middleware/authMiddleware");

//Models
const userModels = require("../models/User");
const courseModel = require("../models/Course");

//Functions from Controller
const getAllCourses = require('../controllers/courseController').getAllCourses


courses.get("/", async (req, res) => {
  res.send("Hello");
});

/**
 * @type POST
 * @route /courses/instructor/:id/create
 * @desc create a new course for a specific instructior
 */
courses.post("/instructor/:id/create", async (req, res) => {
  let courseInfo = req.body;
  let creator = req.params.id;

  try {
    const foundInstructor = await userModels.findOne({ _id: creator });
    console.log(foundInstructor);
    if (foundInstructor && foundInstructor.isInstructor) {
      courseInfo.instructor = foundInstructor._id;
    }
    try {
      const createdCourse = await courseModel.create(courseInfo);
      foundInstructor.courses.push(createdCourse);
      foundInstructor.save();
      res.send(`Course ${createdCourse.title} Successfully Created!`);
    } catch (error) {
      if (error) res.send(error);
    }
  } catch (error) {
    if (error) {
      res.status(404).send("User not found!");
    }
  }
});

//Get All Courses
courses.route("/all").get(protect, getAllCourses); 

/**
 * @type GET
 * @route /courses/course/:id
 * @desc finds a course given an id in the database.
 */
courses.get("/course?", async (req, res) => {
  try {
    let foundCourse = await (
      await courseModel.findOne({ title: { $regex: req.query.title } })
    ).populate("instructor");

    res.send(foundCourse);
  } catch (error) {
    if (error) res.send(error);
  }
});

/**
 * @type DELETE
 * @route /courses/instructior/:id/delete/:course_id
 * @desc deletes a specific course by a given instructor
 */
courses.delete("/instructor/:id/delete/:course_id", async (req, res) => {});

/**
 * @type PUT
 * @route /courses/instructor/:id/course/:course_id/update
 * @desc update a specific course by a given instructor
 */
courses.put("/instructor/:id/course/:course_id/update", async (req, res) => {});

module.exports = courses;
