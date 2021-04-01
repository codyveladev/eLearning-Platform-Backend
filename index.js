const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");

//Routes
const users = require("./Routes/users");
const courses = require("./Routes/courses");
const instructors = require("./Routes/instructors")

//Start on localhost
app.use(cors());
app.use(express.json());
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
  app.use("/instructors", instructors);
  
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.listen(PORT, () => {
    console.log(`Development server started on PORT ${PORT}`);
  });
});
