import { connect } from "mongoose";
import dotenv from "dotenv";
import logger from "../middleware/logger.js";

dotenv.config();

const connectDB = async () => {
  try {
    connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        logger.info("Connected to MongoDB");
      })
      .catch((err) => {
        logger.error(`Error connecting to database: ${err.message}`);
      });
  } catch (err) {
    logger.error(`Error connecting to database: ${err.message}`);
  }
};
//
export default connectDB;
