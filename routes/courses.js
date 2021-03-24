const express = require("express");
const courses = express.Router();

//Models
const userModels = require("../Models/User");
const courseModel = require("../Models/Course");

courses.get("/", async (req, res) => {
  res.send("Hello");
});

/**
 * @type POST
 * @route /courses/instructor/:id/upload
 * @desc create a new course for a specific instructior
 */
courses.post("/instructor/:id/upload", async (req, res) => {
  let courseInfo = req.body;
  let creator = req.params.id;

  const foundInstructor = await userModels.findOne({ _id: creator });

  console.log(foundInstructor);

  if (foundInstructor && foundInstructor.isInstructor) {
    courseInfo.instructor = foundInstructor._id;
    try {
      const createdCourse = await courseModel.create(courseInfo);
      foundInstructor.courses.push(createdCourse); 
      foundInstructor.save()
      res.send(`Course ${createdCourse.title} Successfully Created!`); 
    } catch (error) {
      if (error) res.send(error); 
    }
  }
});

/**
 * @type GET
 * @route /courses/all
 * @desc return all courses in the database.
 */
courses.get("/all", async (req, res) => {});

/**
 * @type GET
 * @route /courses/course/:id
 * @desc finds a course given an id in the database.
 */
courses.get("/course/:id", async (req, res) => {});

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
