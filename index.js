const express = require("express");
const app = express();
const mongoose = require("mongoose");

//For the connect key
require("dotenv").config();
//Allow cross orgin requests
const cors = require("cors");
app.use(cors());

//Allow for express to use JSON
app.use(express.json());

//Routes
const users = require("./Routes/users");
const courses = require("./Routes/courses");
const quizzes = require("./Routes/quizzes");
const instructors = require("./Routes/instructors");

//Port that will be started on.
const PORT = 8080;

//Connect to mongodb
let intializeConnection = async () => {
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
};

//Connect to database on start
intializeConnection().then(() => {
  //Include the routes
  app.use("/users", users);
  app.use("/courses", courses);
  app.use("/quizzes", quizzes);
  app.use("/instructors", instructors);

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`Development server started on PORT ${PORT}`);
  });
});
