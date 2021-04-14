import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_CONNECT_KEY, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
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

export default connectDB;
