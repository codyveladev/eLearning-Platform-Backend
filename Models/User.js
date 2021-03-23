const mongoose = require("mongoose");

const userModel = mongoose.model("users", new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    email: String, 
    password: String, 
}))

module.exports = userModel; 