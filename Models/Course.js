const mongoose = require("mongoose");

const courseModel = mongoose.model(
  "courses",
  new mongoose.Schema({
    title: String,
    video_link: String,
    description: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
  })
);

module.exports = courseModel;
