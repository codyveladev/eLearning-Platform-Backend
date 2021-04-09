const userModel = require("../Models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

describe("User", () => {
  beforeAll(async () => {
    try {
      //Creating a new mongoose promise for database
      let database = (mongoose.Promise = global.Promise);
      await mongoose.connect(process.env.MONGO_CONNECT_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      //Check if the connection was successful and display message.
      if (database) {
        console.log("Database Status: Connected");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  });

  it("Insert one user into the database", async () => {
    const newUserInfo = {
      firstName: "Cody",
      lastName: "Vela",
      userName: "cvela09",
      email: "cvel@test.com",
      password: "testpassword",
      isInstructor: false,
    };
    try {
      newUserInfo.password = await encryptPassword(newUserInfo.password);

      const createdUser = new userModel(newUserInfo);

      expect(createdUser._id).toBeDefined;
      expect(createdUser.firstName).toBe(newUserInfo.firstName);
    } catch (error) {
      console.log("error in insert one");
    }
  });
  it("Return All Users", async () => {
    let listOfUsers = await userModel.find();
    expect(listOfUsers).toBeDefined();
  });
  it("Find user by ID", async () => {
    let id = "605b90cefc71acf3f126fdb9";
    let foundUser = await userModel.findOne({ _id: id });

    expect(foundUser).toBeDefined();
  });
  afterAll(async () => {
    userModel.deleteMany();
    await mongoose.connection.close();
  });
});

//Helper Functions
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
