const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * @desc  Returns all users in the database
 * @route POST /users/all
 * @access Public
 */
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find()
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

  //if username is taken 
  if (await checkIfUsernameExists(newUserInfo.userName)) {
    res.status(409).send("Username already exists...");
    console.log("Username already exists...");
    return;
  }

  //if email is taken
  if (await checkIfEmailExists(newUserInfo.email)) {
    res.status(409).send("Email already in use...");
    console.log("Email already in use...");
    return;
  }

  //Register user to database
  try {
    const userCreated = await addUserToDB(newUserInfo);
    if (userCreated) {
      res.send(`User with ID ${userCreated} has been created!`);
    }
  } catch (error) {
    res.status(401).send(error);
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

    if (foundUser && (await foundUser.matchPassword(userInfo.password))) {
      res.json({
        _id: foundUser._id,
        email: foundUser.email,
        userName: foundUser.userName,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        isInstructor: foundUser.isInstructor,
        token: generateToken(foundUser._id),
      });
    }
  } catch (e) {
    if (e) res.status(401).send("Invalid username or password");
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


const registerInstructor = async(req, res) => {
  //Get the user info from the request body
  const newUserInfo = req.body;
  newUserInfo.isInstructor = true;

  //if username is taken
  if (await checkIfUsernameExists(newUserInfo.userName)) {
    res.status(409).send("Username already exists...");
    console.log("Username already exists...");
    return;
  }

  //if email is taken
  if (await checkIfEmailExists(newUserInfo.email)) {
    res.status(409).send("Email already in use...");
    console.log("Email already in use...");
    return;
  }

  //Register user to database
  try {
    const userCreated = await addUserToDB(newUserInfo);
    if (userCreated) {
      res.send(`User with ID ${userCreated} has been created!`);
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
}

module.exports.registerInstructor = registerInstructor;


//********* HELPER FUNCTIONS  ***********/
const addUserToDB = async (user) => {
  const userToStore = await User.create(user);
  await userToStore.save();
  return userToStore._id;
};

const checkIfEmailExists = async (email) => {
  //check if the email already exists
  return await User.findOne({ email: email });
};
const checkIfUsernameExists = async (username) => {
  //check if the Username already exists
  return await User.findOne({ userName: username });
};
//********* END HELPER FUNCTIONS  ***********/