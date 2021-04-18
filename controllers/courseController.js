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
