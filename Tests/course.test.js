const dotenv = require("dotenv");
const mongoose = require("mongoose");
const courseModel = require("../models/Course");
const userModel = require("../models/User");

dotenv.config();

var testCourseId;

describe("Course Test Cases: ", () => {
  beforeAll(async () => {
    try {
      //Creating a new mongoose promise for database
      let database = (mongoose.Promise = global.Promise);
      await mongoose.connect(process.env.MONGO_CONNECT_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  });
  afterAll(async () => {
    //Delete the test course
    let instructor_id = "6092fd4fae272f37011cc421";

    try {
      const foundUser = await userModel.findById(instructor_id);

      let courseIdx = foundUser.courses.indexOf(testCourseId);
      foundUser.courses.splice(courseIdx, 1);
      await foundUser.save();

      await courseModel.deleteOne({ _id: testCourseId });

      await mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  });
  it("Insert One Course Into DB", async () => {
    const testCourse = {
      title: "test_course",
      video_link: "http://testing.test.com",
      description: "this is a test course...",
      instructor: "607f6d03b52c2f2cf4f3fbb1",
      quiz: "6092fd4fae272f37011cc421",
      thumbnail: "jsjsjs",
    };

    const createdCourse = await courseModel.create(testCourse);
    expect(createdCourse._id).toBeDefined();
    expect(createdCourse.title).toBe(testCourse.title);
    testCourseId = createdCourse._id;
  });
  it("Return All Courses From DB", async () => {
    const allCourses = await courseModel.find({});
    expect(allCourses).toBeDefined;
  });
  it("Return Course By ID", async () => {
    const courseToSearch = "609852c6ba7d92d7acec26fb";
    const foundCourse = await courseModel.findById(courseToSearch);
    expect(foundCourse).toBeDefined();
    expect(foundCourse.title).toBe(
      "HTML Full Course - Build a Website Tutorial"
    );
  });
  it("Validate Course Creation: Title", async () => {
    const invalidTestCourse = {
      video_link: "http://testing.test.com",
      description: "this is a test course...",
      instructor: "607f6d03b52c2f2cf4f3fbb1",
    };

    expect.assertions(1);
    try {
      await courseModel.create(invalidTestCourse);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
