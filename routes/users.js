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
 * @type POST
 * @route /users/register
 * @desc Registers one user into the database
 */
users.post("/register", async (req, res) => {
  try {
    //Get the user info from the request body
    const newUserInfo = req.body;
    console.log(newUserInfo); 

    //Encrypt password before storing
    newUserInfo.password = await encryptPassword(newUserInfo.password);

    try {
      const userToStore = await userModels.create(newUserInfo);
      console.log(userToStore)
      userToStore.save(); 
      if (userToStore) {
        res.send(`User with ID ${userToStore._id} has been created!`);
      }
    } catch (error) {
      res.send(error);
      console.log(error)
    }
  } catch (e) {
    res.status(201);
  }
});

/**
 * @type GET
 * @route /users/user/:id
 * @desc Finds a user by ID in the database and returns the information.
 */
users.get("/user/:id", async (req, res) => {});

//Helper Functions
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

module.exports = users;
