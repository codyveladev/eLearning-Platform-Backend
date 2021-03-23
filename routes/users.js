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
    const newUserInfo = req.body;

    //Encrypt password before storing
    const encryptedPassword = await encryptPassword(newUserInfo.password);

    const createdUser = {
      firstName: newUserInfo.firstName,
      lastName: newUserInfo.lastName,
      email: newUserInfo.email,
      userName: newUserInfo.userName,
      password: encryptedPassword,
    };

    try {
      const userToStore = await userModels.create(createdUser);

      if (userToStore) {
        res.send(`User with ID ${userToStore._id} has been created!`);
        await userToStore.save(); 
      } else {
        res.send("ERROR: Something happened with registration!");
      }
    } catch (e) {
      if (e) {
        res.send(e);
      }
    }
  } catch (e) {
    res.status(201);
  }
});

//Helper Functions
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
module.exports = users;
