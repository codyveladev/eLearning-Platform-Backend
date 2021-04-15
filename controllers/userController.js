const User = require("../models/User");

/**
 * @desc  Returns all users in the database
 * @route POST /users/all
 * @access Public
 */
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (e) {
    if (e) {
      console.log(e);
    }
  }
};
module.exports.getAllUsers = getAllUsers;

/**
 * @desc  Register new user
 * @route POST /users/register
 * @access Public
 */
const registerUser = async (req, res) => {
  //Get the user info from the request body
  const newUserInfo = req.body;
  newUserInfo.isInstructor = false;

  //Check if the username already exists
  let foundByUserName = await User.findOne({
    userName: newUserInfo.userName,
  });
  //Handler error
  if (foundByUserName) {
    res.status(409).send("Username already exists...");
    console.log("Username already exists...");
    return;
  }

  //check if the email already exists
  let foundByEmail = await User.findOne({ email: newUserInfo.email });
  //Handle error
  if (foundByEmail) {
    res.status(409).send("Email already in use...");
    console.log("Email already in use...");
    return;
  }
  //Register user to database
  try {
    const userToStore = await User.create(newUserInfo);
    userToStore.save();
    if (userToStore) {
      res.send(`User with ID ${userToStore._id} has been created!`);
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
module.exports.registerUser = registerUser;

/**
 * @desc  Login for user
 * @route POST /users/login
 * @access Public
 */
const loginUser = async (req, res) => {
  let userInfo = req.body;

  try {
    const foundUser = await User.findOne({ userName: userInfo.userName });

    if (!foundUser) {
      res.status(404).send("User not found!");
      return;
    }

    let doesMatch = await foundUser.matchPassword(userInfo.password);

    if (!doesMatch) {
      res.send("Password Does Not Match...");
      return;
    }

    res.send("Login Success!");
  } catch (e) {
    if (e) res.send(e);
  }
};
module.exports.loginUser = loginUser;

/**
 * @desc  Get user by ID
 * @route POST /users/user/:id
 * @access Public - For now
 */
const getUserById = async (req, res) => {
  //Get the user id from request
  let userId = req.params.id;

  try {
    //Find the user in the database given the ID
    let foundUser = await User.findById(userId).select("-password");

    //Send the information
    res.send(foundUser);
  } catch (e) {
    if (e) {
      res.status(404).send("User not found");
      return;
    }
  }
};
module.exports.getUserById = getUserById;
