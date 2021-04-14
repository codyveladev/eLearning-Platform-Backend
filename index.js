import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

//For the connect key
dotenv.config();
//Allow cross orgin requests
import cors from "cors";
const app = express();
app.use(cors());

//Allow for express to use JSON
app.use(express.json());

//Routes
import users from "./routes/users.js";
import courses from "./routes/courses.js";
import quizzes from "./routes/quizzes.js";
import instructors from "./routes/instructors.js";

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
    console.log(`Development server started on PORT ${PORT}`);
  });
});
