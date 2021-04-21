const express = require("express");
const courses = express.Router();

//Auth Middleware
const protect = require("../middleware/authMiddleware");

//Models
const userModels = require("../models/User");
const courseModel = require("../models/Course");

//Functions from Controller
const getAllCourses = require('../controllers/courseController').getAllCourses
const getCourseById = require('../controllers/courseController').getCourseById
const createCourse = require('../controllers/courseController').createCourse


//Get All Courses
courses.route("/").get(protect, getAllCourses); 

//Get course by ID
courses.route("/course/:id").get(protect, getCourseById); 

/**
 * @type POST
 * @route /courses/instructor/:id/create
 * @desc create a new course for a specific instructior
 */
courses.route("/upload").post(protect, createCourse);

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
