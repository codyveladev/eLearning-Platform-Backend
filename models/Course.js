const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, index: true, required: true },
  video_link: { type: String, required: true },
  description: { type: String, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

courseSchema.index({ title: "text" });

module.exports = mongoose.model("Course", courseSchema);
