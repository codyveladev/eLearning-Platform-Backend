const express = require("express");
const courses = express.Router();

//Auth Middleware
const protect = require("../middleware/authMiddleware");

//Functions from Controller
const getAllCourses = require("../controllers/courseController").getAllCourses;
const getCourseById = require("../controllers/courseController").getCourseById;
const createCourse = require("../controllers/courseController").createCourse;
const findCourseByTitle = require("../controllers/courseController")
  .findCourseByTitle;
const updateCourseInfo = require("../controllers/courseController")
  .updateCourseInfo;
const deleteCourse = require("../controllers/courseController").deleteCourse;

/**
 * @swagger
 * tags:
 *    name: Courses
 *    description: Course routes
 */

/**
 * @swagger
 * /api/courses/:
 *      get:
 *        summary: Returns all courses in database
 *        tags: [Courses]
 *        parameters:
 *         - in: header
 *           name: JSON Web Token
 *           type: string
 *           required: true
 *        responses:
 *          200:
 *            description: An array of objects with course information
 *          401:
 *            description: An error occured getting the list of courses.
 *
 */
courses.route("/").get(protect, getAllCourses);

/**
 * @swagger
 * /api/courses/course/{id}:
 *      get:
 *        summary: Returns one courses in database that is found by an id
 *        tags: [Courses]
 *        parameters:
 *         - in: header
 *           name: JSON Web Token
 *           type: string
 *           required: true
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *        responses:
 *          200:
 *            description: An object with the course information
 *          401:
 *            description: User not authorized
 *          404:
 *            description: The course was not found.
 *
 */
courses.route("/course/:id").get(protect, getCourseById);

/**
 * @swagger
 * /api/courses/upload:
 *      post:
 *        summary: Returns one courses in database that is found by an id
 *        tags: [Courses]
 *        parameters:
 *          - in: header
 *            name: JSON Web Token
 *            type: string
 *            required: true
 *          - in: body
 *            name: course
 *            description: The information of the course
 *            schema:
 *             type: object
 *             required:
 *                 -title
 *                 -video_link
 *                 -description
 *                 -instructor
 *             properties:
 *                 title:
 *                      type: string
 *                      required: true
 *                 video_link:
 *                      type: string
 *                      required: true
 *                 description:
 *                      type: string
 *                      required: true
 *                 instructor:
 *                      type: string
 *                      required: true
 *        responses:
 *          200:
 *            description: The course was successfully added
 *          401:
 *            description: User not authorized
 *          501:
 *            description: An error occured created the course.
 *
 */
courses.route("/upload").post(protect, createCourse);

/**
 * @swagger
 * /api/courses?title=:
 *      get:
 *        summary: Returns a list of courses matching the term by title
 *        tags: [Courses]
 *        parameters:
 *          - in: header
 *            name: JSON Web Token
 *            type: string
 *            required: true
 *          - in: path
 *            name: title
 *            description: title of the course
 *        responses:
 *          200:
 *            description: List of courses
 *          401:
 *            description: User not authorized
 *          404:
 *            description: course not found
 *          501:
 *            description: An error occured finding the quiz
 *
 */
courses.route("/course?").get(protect, findCourseByTitle);

/**
 * @swagger
 * /api/course/{id}/update:
 *      put:
 *        summary: Updates a coruse with new information
 *        tags: [Courses]
 *        parameters:
 *          - in: header
 *            name: JSON Web Token
 *            type: string
 *            required: true
 *          - in: path
 *            name: id
 *            description: id of the course
 *          - in: body
 *            name: id
 *            description: id of the course
 *            schema:
 *             type: object
 *             required:
 *                 -title
 *                 -video_link
 *                 -description
 *             properties:
 *                 title:
 *                      type: string
 *                      required: true
 *                 video_link:
 *                      type: string
 *                      required: true
 *                 description:
 *                      type: string
 *                      required: true
 *        responses:
 *          200:
 *            description: Course was sucessfully updated
 *          401:
 *            description: User not authorizedd
 *          501:
 *            description: An error occured updating the course
 *
 */
courses.route("/course/:id/update").put(protect, updateCourseInfo);

/**
 * @swagger
 * /api/courses/course/{id}/delete:
 *      delete:
 *        summary: Deletes a course from the database.
 *        tags: [Courses]
 *        parameters:
 *         - in: header
 *           name: JSON Web Token
 *           type: string
 *           required: true
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *        responses:
 *          200:
 *            description: A course was deleted
 *          401:
 *            description: User not authorized
 *          404:
 *            description: The course was not found.
 *
 */
courses.route("/course/:id/delete").delete(protect, deleteCourse);

module.exports = courses;
