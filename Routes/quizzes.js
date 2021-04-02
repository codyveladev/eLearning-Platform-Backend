const express = require("express");
const quizzes = express.Router();
const quizModel = require("../Models/Quiz");
/**
 * May not need this file
 * This file is currently used for development
 * Need to be able to create the course and the quiz... not sure if it is a good idea to do it on one route though
 */

quizzes.get("/", async (req, res) => {
  res.send("Quizzes working...");
});

quizzes.post("/create", async (req, res) => {
  let quiz = req.body;

  for (let i = 0; i < quiz.questions.length; i++) {
    console.log("Question: ", quiz.questions[i]);
    for (let j = 0; j < quiz.answers[i].length; j++) {
      console.log("Answer Choice: ", quiz.answers[i][j]);
    }
    console.log("Correct Answer: ", quiz.correctAnswers[i]);
  }

  try {
    let createdQuiz = await quizModel.create(quiz);
    createdQuiz.save()
    console.log(createdQuiz);
    res.send(createdQuiz);
  } catch (error) {
    res.send(error);
  }

});

module.exports = quizzes;
