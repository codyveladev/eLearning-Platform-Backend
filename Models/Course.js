const mongoose = require("mongoose");

const courseModel = mongoose.model(
  "courses",
  new mongoose.Schema({
    title: String,
    video_link: String,
    description: String,
    author: String, //Need to make this a connection to the instructor schema 
    quiz: String, //Need to make this a connection to quiz schema
  })
);

module.exports = courseModel;
