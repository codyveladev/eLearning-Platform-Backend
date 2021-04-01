const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  questions: {
    type: Array,
  },
  answers: {
    type: Array,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
