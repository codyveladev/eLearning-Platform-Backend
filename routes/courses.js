const express = require("express");
const courses = express.Router();

//Auth Middleware
const protect = require("../middleware/authMiddleware");

//Models
const userModels = require("../models/User");
const courseModel = require("../models/Course");

//Functions from Controller
const getAllCourses = require("../controllers/courseController").getAllCourses;
const getCourseById = require("../controllers/courseController").getCourseById;
const createCourse = require("../controllers/courseController").createCourse;
const findCourseByTitle = require("../controllers/courseController").findCourseByTitle;
const updateCourseInfo = require("../controllers/courseController").updateCourseInfo;

//Get All Courses
courses.route("/").get(protect, getAllCourses);

//Get course by ID
courses.route("/course/:id").get(protect, getCourseById);

//Create a course
courses.route("/upload").post(protect, createCourse);

//Search for a course
courses.route("/course?").get(protect, findCourseByTitle);

//Update a course info
courses.route("/course/:id/update").put(protect, updateCourseInfo);

/**
 * @type GET
 * @route /courses/course?title=
 * @desc finds a course given an id in the database.
 */
courses.get("/course?title=", async (req, res) => {
  try {
    let foundCourse = await courseModel
      .findMany({ title: { $regex: req.query.title } })
      .populate("instructor");

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


module.exports = courses;
