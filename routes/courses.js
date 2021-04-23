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
const deleteCourse = require("../controllers/courseController").deleteCourse;

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

//Delete Course 
courses.route("/course/:id/delete").delete(protect, deleteCourse);


module.exports = courses;
