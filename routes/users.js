const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");

//Models
const userModels = require("../Models/User");

/**
 * @type GET
 * @route /users/all
 * @desc returns all of the users in the database
 */
users.get("/all", async (req, res) => {
  try {
    let users = await userModels.find();
    res.send(users);
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
});

/**
 * @type GET
 * @route /users/login
 * @desc login a user
 */
users.get("/login", async (req, res) => {
  let userInfo = req.body;

  try {
    const foundUser = await userModels.findOne({ userName: userInfo.userName });

    if (!foundUser) {
      res.send("User not found!");
    }

    let doesMatch = await bcrypt.compare(userInfo.password, foundUser.password);

    if (!doesMatch) {
      res.send("Password Does Not Match...");
    }

    res.send("Login Success!");
  } catch (e) {
    if (e) res.send(e);
  }
});

/**
 * @type POST
 * @route /users/register
 * @desc Registers one user into the database
 */
users.post("/register", async (req, res) => {
  //Get the user info from the request body
  const newUserInfo = req.body;
  newUserInfo.isInstructor = false;

  //Check if the username already exists
  let foundByUserName = await userModels.findOne({
    userName: newUserInfo.userName,
  });
  if (foundByUserName) {
    res.status(409).send("Username already exists...");
    console.log("Username already exists...");
    return;
  }

  //check if the email already exists
  let foundByEmail = await userModels.findOne({ email: newUserInfo.email });
  if (foundByEmail) {
    res.status(409).send("Email already in use...");
    console.log("Email already in use...");
    return;
  }

  //Encrypt password before storing
  newUserInfo.password = await encryptPassword(newUserInfo.password);

  try {
    const userToStore = await userModels.create(newUserInfo);
    userToStore.save();
    if (userToStore) {
      res.send(`User with ID ${userToStore._id} has been created!`);
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

/**
 * @type GET
 * @route /users/user/:id
 * @desc Finds a user by ID in the database and returns the information.
 */
users.get("/user/:id", async (req, res) => {
  //Get the user id from request
  let userId = req.params.id;

  try {
    //Find the user in the database given the ID
    let foundUser = await userModels.findOne({ _id: userId });

    //Only send 3 fields omitting email, password and ID
    let userInformationToSend = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      userName: foundUser.userName,
      courses: foundUser.courses
    };

    //Send the information
    res.send(userInformationToSend);
  } catch (e) {
    if (e) res.status(404).send("User not found...");
  }
});

//Helper Functions
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

module.exports = users;
