const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");

//For the connect key
dotenv.config();
//Allow cross orgin requests
const cors = require("cors");
const app = express();
app.use(cors());

//Allow for express to use JSON
app.use(express.json());

//Routes
const users = require("./routes/users");
const courses = require("./routes/courses");
const quizzes = require("./routes/quizzes");
const instructors = require("./routes/instructors");

//Port that will be started on.
const PORT = 8080;

//Connect to database on start
connectDB().then(() => {
  //Include the routes
  app.use("/users", users);
  app.use("/courses", courses);
  app.use("/quizzes", quizzes);
  app.use("/instructors", instructors);

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`Development server started on PORT ${PORT}`.yellow.bold);
  });
});
