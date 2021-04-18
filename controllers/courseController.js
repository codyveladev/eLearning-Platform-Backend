const Course = require("../models/Course");

/**
 * @desc Return all courses in the database.
 * @route /api/courses/all
 * @access Private
 */
const getAllCourses = async (req, res) => {
  try {
    let allCourses = await Course.find().populate("instructor");
    res.send(allCourses);
  } catch (error) {
    if (error) console.log(error);
  }
};

module.exports.getAllCourses = getAllCourses;


/**
 * @desc Returns one course from the database via id search
 * @route /api/courses/course/:id
 * @access Private
 */
const getCourseById = async (req, res) => {
  let courseId = req.params.id;
  try {
    let foundCourse = await Course.findById(courseId).populate("Instructor");
    res.send(foundCourse);
  } catch (error) {
    res.status(404).send("COURSE NOT FOUND");
  }
};

module.exports.getCourseById = getCourseById;
