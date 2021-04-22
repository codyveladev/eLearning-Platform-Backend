const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, index: true },
  video_link: String,
  description: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

courseSchema.index({title: "text"})

module.exports = mongoose.model("Course", courseSchema);
