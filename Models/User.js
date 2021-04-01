const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  isInstructor: Boolean,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
