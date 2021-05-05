const dotenv = require("dotenv");
const mongoose = require("mongoose");
const courseModel = require("../models/Course");
const userModel = require("../models/User");
const quizModel = require("../models/Quiz");

dotenv.config();

var testQuizId;

describe("Quiz Test Cases: ", () => {
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
    try {
      await quizModel.deleteOne({ _id: testQuizId });
      await mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  });
  it("Insert One Quiz into DB", async () => {
    const testQuiz = {
      questions: ["What is 2+2?", "What is 2 * 3?", "What is HTML?"],
      answers: [
        ["2", "1", "4", "100"],
        ["4", "10", "6", "9"],
        ["Idk", "Displays text", "Kitchen Gadget", "Not sure"],
      ],
      correctAnswers: ["4", "6", "Displays Text"],
    };

    const createdQuiz = await quizModel.create(testQuiz);
    expect(createdQuiz).toBeDefined();
    expect(createdQuiz._id).toBeDefined();
    testQuizId = createdQuiz._id;
  });
  it("Return All Quiz from DB", async () => {
    const allQuizzes = await quizModel.find({});
    expect(allQuizzes).toBeDefined();
  });
  it("Return Quiz by ID", async () => {
    const quizFoundById = await quizModel.findById(testQuizId);
    expect(quizFoundById).toBeDefined();
  });
  it("Validate Quiz Creation: Questions", async () => {
    const invalidTestQuiz = {
      answers: [
        ["2", "1", "4", "100"],
        ["4", "10", "6", "9"],
        ["Idk", "Displays text", "Kitchen Gadget", "Not sure"],
      ],
      correctAnswers: ["4", "6", "Displays Text"],
    };

    try {
      await quizModel.create(invalidTestQuiz);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
