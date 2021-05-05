const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userModel = require("../models/User");

dotenv.config();

describe("User Test Cases: ", () => {
  beforeAll(async () => {
    try {
      //Creating a new mongoose promise for database
      let database = (mongoose.Promise = global.Promise);
      await mongoose.connect(process.env.MONGO_CONNECT_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  });
  afterAll(async () => {
    await userModel.deleteOne({ userName: "cvela09" });
    await mongoose.connection.close();
  });

  it("Insert One User Into DB", async () => {
    const newUserInfo = {
      firstName: "Cody",
      lastName: "Vela",
      userName: "cvela09",
      email: "cvel@test.com",
      password: "testpassword",
      isInstructor: false,
    };
    try {
      const createdUser = await userModel.create(newUserInfo);
      expect(createdUser._id).toBeDefined;
      expect(createdUser.firstName).toBe(newUserInfo.firstName);
    } catch (error) {
      console.log(error);
    }
  });
  it("Return All Users", async () => {
    let listOfUsers = await userModel.find();
    expect(listOfUsers).toBeDefined();
  });
  it("Return One By ID", async () => {
    let idToSearch = "6091dec298473a826c89b8e2";

    try {
      const userFound = await userModel.findById(idToSearch);
      expect(userFound).toBeDefined();
      expect(userFound.userName).toBe("swill");
      expect(userFound.firstName).toBe("Skylar");
    } catch (error) {
      console.log("Error in find one by ID");
    }
  });
  it("Validate Registration Fields: userName", async () => {
    const invalidUserInfo = {
      firstName: "Cody",
      lastName: "Vela",
      password: "testpassword",
      isInstructor: false,
    };

    expect.assertions(1);
    try {
      await userModel.create(invalidUserInfo);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
