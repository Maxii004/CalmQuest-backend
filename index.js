import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./src/routes/index.js";
import logger from "./src/middleware/logger.js";
import connectDB from "./src/config/db-connection.js";
import credentials from "./src/middleware/credentials.js";
import corsOptions from "./src/config/cors-options.js";

dotenv.config();
const { json, urlencoded } = bodyParser;
const port = process.env.PORT;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

// Connect to your MongoDB database
// connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.error(`Error connecting to database: ${err.message}`);
//   });
connectDB();

// Use your routes module
app.use("/", routes);

// Start the server
app.listen(port, () => logger.info(`Server running on port ${port}`));
