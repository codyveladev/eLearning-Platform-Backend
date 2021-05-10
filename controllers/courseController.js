const Course = require("../models/Course");
const User = require("../models/User");

/**
 * @desc Return all courses in the database.
 * @route /api/courses
 * @access Private
 */
const getAllCourses = async (req, res) => {
  try {
    let allCourses = await Course.find().populate("instructor").select('-courses');
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
    let foundCourse = await Course.findById(courseId).populate("quiz")
    res.send(foundCourse);
  } catch (error) {
    console.log(error)
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
    if (error) res.status(501).send(error);
  }
};
module.exports.createCourse = createCourse;

/**
 * @desc returns courses matching a title
 * @route /api/courses/course?title
 * @access Private
 */
const findCourseByTitle = async (req, res) => {
  let searchTerm = req.query.title;
  console.log(searchTerm);

  try {
    let foundItems = await Course.find({
      $text: { $search: searchTerm, $caseSensitive: false },
    }).populate("Quiz");

    console.log(foundItems);
    res.send(foundItems);
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
};
module.exports.findCourseByTitle = findCourseByTitle;

/**
 * @desc Update course info
 * @route /api/courses/course/:id/update
 * @access Private
 */
const updateCourseInfo = async (req, res) => {
  let courseId = req.params.id; //Course to update.
  let newCourseInfo = req.body; //Course information to update.

  if (!req.user.isInstructor) {
    res.status(401).send("MUST BE INSTRUCTOR");
    return;
  }

  try {
    let updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      newCourseInfo
    );
    res.status(200).send(`Course: ${updatedCourse.title} has been updated...`);
  } catch (error) {
    if (error) {
      res.status(501).send("Something went wrong updating the course");
      console.log(error);
    }
  }
};
module.exports.updateCourseInfo = updateCourseInfo;

/**
 * @desc Update course info
 * @route /api/courses/course/:id/delete
 * @access Private
 */
const deleteCourse = async (req, res) => {
  let courseId = req.params.id; //From URL
  let userId = req.user.id; //From TOKEN

  try {
    let foundUser = await User.findById(userId);

    if (!foundUser.courses.includes(courseId)) {
      res.status(401).send("ACCESS FORBIDDEN");
    }

    if (foundUser) {
      let courseIdx = foundUser.courses.indexOf(courseId);
      foundUser.courses.splice(courseIdx, 1);
      foundUser.save();
    }

    await Course.deleteOne({ _id: courseId });

    res.send("Course deleted! ...");
  } catch (error) {
    if (error) {
      console.log(error);
      res.send(error);
    }
  }
};
module.exports.deleteCourse = deleteCourse;
