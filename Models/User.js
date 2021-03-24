const mongoose = require("mongoose");

//Get Course Model
const courseSchema = require("../Models/Course");

const userModel = mongoose.model(
  "users",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      maxlength: [128, "Email can't be greater than 128 characters"],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    isInstructor: Boolean,
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],
  })
);

module.exports = userModel;
