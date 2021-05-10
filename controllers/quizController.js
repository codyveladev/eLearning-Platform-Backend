const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

const calculateScore = async (req, res) => {
  const {quizId} = req.body;
  const { userAns } = req.body;

  try {

    const foundQuiz = await Quiz.findById(quizId);

    let score = 0;
    for (let i = 0; i < userAns.length; i++) {
      if (userAns[i] === foundQuiz.correctAnswers[i]) {
        score = score + 1;
      }
    }

    if(score < 4){
      res.send("FAIL")
    }
    else{
      res.send("PASS")
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

module.exports.calculateScore = calculateScore; 
