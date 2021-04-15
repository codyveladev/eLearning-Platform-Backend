const express = require("express");
const users = express.Router();

//Middleware
const protect = require("../middleware/authMiddleware").protect;

//Functions from Controller
const registerUser = require("../controllers/userController").registerUser;
const loginUser = require("../controllers/userController").loginUser;
const getAllUsers = require("../controllers/userController").getAllUsers;
const getUserById = require("../controllers/userController").getUserById;

//Register User
users.route("/register").post(registerUser);

//Login User
users.route("/login").post(loginUser);

//Get All Users
users.route("/all").get(getAllUsers);

//Get User by Id
users.route("/user/:id").get(protect, getUserById);

module.exports = users;
