const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");

/****** API DOCS CONFIG  **************/
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eLearning Platform API",
      version: "1.0.0",
      description: "API for the eLearning Platform",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*js"],
};

const specs = swaggerJsDoc(options);

/****** END API DOCS CONFIG **************/

//For the connect key
dotenv.config();

//Allow cross orgin requests
const cors = require("cors");
const app = express();

//Allow for express to use JSON
app.use(express.json());

app.use(cors());



//Routes
const users = require("./routes/userRoutes");
const courses = require("./routes/courseRoutes");
const quizzes = require("./routes/quizzes");

//Port that will be started on.
const PORT = 8080;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
//Include the routes
app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/quizzes", quizzes);

app.get("/", (req, res) => {
  res.send("hello world");
});

//Connect to database on start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Development server started on PORT ${PORT}`.yellow.bold);
  });
});
