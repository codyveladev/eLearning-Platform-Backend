const express = require("express");
const calculateScore  = require("../controllers/quizController").calculateScore;
const quizzes = express.Router();
const quizModel = require("../models/Quiz");
const protect = require("../middleware/authMiddleware")
/**
 * May not need this file
 * This file is currently used for development
 * Need to be able to create the course and the quiz... not sure if it is a good idea to do it on one route though
 */

quizzes.get("/", async (req, res) => {
  res.send("Quizzes working...");
});

quizzes.get("/show-all", async (req, res) => {
  let quiz = await quizModel.find();

  for (let i = 0; i < quiz[0].questions.length; i++) {
    console.log("Question: ", quiz[0].questions[i]);
    for (let j = 0; j < quiz[0].answers[i].length; j++) {
      console.log("Answer Choice: ", quiz[0].answers[i][j]);
    }
    console.log("Correct Answer: ", quiz[0].correctAnswers[i]);
  }

  res.send(quiz);
});

quizzes.route('/score').post(protect, calculateScore)

quizzes.post("/create", async (req, res) => {
  let quiz = req.data;

  //Test to see if the formatting is nice, doesnt do anyting but
  //Printing it pretty
  for (let i = 0; i < quiz.questions.length; i++) {
    console.log("Question: ", quiz.questions[i]);
    for (let j = 0; j < quiz.answers[i].length; j++) {
      console.log("Answer Choice: ", quiz.answers[i][j]);
    }
    console.log("Correct Answer: ", quiz.correctAnswers[i]);
  }

  try {
    let createdQuiz = await quizModel.create(quiz);
    createdQuiz.save();
    console.log(createdQuiz);
    res.send(createdQuiz);
  } catch (error) {
    res.send(error);
  }
});

module.exports = quizzes;
    
  
