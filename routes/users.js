const express = require("express");
const users = express.Router();

//Functions from Controller
const registerUser = require("../controllers/userControllers").registerUser;
const loginUser = require("../controllers/userControllers").loginUser;
const getAllUsers = require("../controllers/userControllers").getAllUsers;
const getUserById = require("../controllers/userControllers").getUserById;

//Register User
users.route("/register").post(registerUser);

//Login User
users.route("/login").post(loginUser);

//Get All Users
users.route("/all").get(getAllUsers);

//Get User by Id
users.route("/user/:id").get(getUserById);

module.exports = users;
