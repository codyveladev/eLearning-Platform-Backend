const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_CONNECT_KEY, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.underline.cyan.bold
    );
  } catch (error) {
    if (error) {
      console.error(`Error: ${error.message}`.underline.red.bold);
      process.exit(1);
    }
  }
};

module.exports = connectDB