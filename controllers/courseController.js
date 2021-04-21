const Course = require("../models/Course");

/**
 * @desc Return all courses in the database.
 * @route /api/courses
 * @access Private
 */
const getAllCourses = async (req, res) => {
  if (!req.user.isInstructor) {
    res.status(401).send("NOT AUTHORIZED");
    return;
  }
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

/**
 * @desc Returns one course from the database via id search
 * @route /api/courses/upload
 * @access Private
 */
const createCourse = async (req, res) => {
  //Get the Data from the body
  let courseInfo = req.body;
  let user = req.user;

  //If we dont have an instructor send error
  if (!user.isInstructor) {
    res.status(401).send("NOT AUTHORIZED");
  }
  //Create the instructor
  courseInfo.instructor = user._id;

  try {
    const createdCourse = await Course.create(courseInfo);
    user.courses.push(createdCourse._id);
    await user.save();
    res.send(`Course ${createdCourse.title} Successfully Created!`);
  } catch (error) {
    if (error) res.send(error);
  }
};
module.exports.createCourse = createCourse;
