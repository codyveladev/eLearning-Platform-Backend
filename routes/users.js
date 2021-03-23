const express = require("express");
const users = express.Router();

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
    const createdUser = await userModels.create(newUserInfo);

    if (createdUser) {
      res.send(createdUser);
    }
  } catch (e) {}
});


//Helper Functions 
const encrptPassword = (password) => {
   
   return passwordEncrpted;

}

module.exports = users;
