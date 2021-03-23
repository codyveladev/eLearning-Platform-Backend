const mongoose = require("mongoose");

const userModel = mongoose.model(
  "users",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
  }),
  "users"
);

module.exports = userModel;
