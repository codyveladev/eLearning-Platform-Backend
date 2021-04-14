const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  questions: [{ type: String, required: true }],
  answers: [[{ type: String, required: true }]],
  correctAnswers: [{ type: String, required: true }],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
