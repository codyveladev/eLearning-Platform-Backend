const mongoose = require("mongoose");



const instructorModel = mongoose.model(
  "instructors",
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
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  })
);

module.exports = instructorModel;
