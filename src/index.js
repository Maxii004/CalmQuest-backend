import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import routes from "./routes/index.js";

const { json, urlencoded } = bodyParser;
const port = 3001;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

// Connect to your MongoDB database
connect(
  "mongodb+srv://37se0011:calmquest0011@calmquest.2qbtyuw.mongodb.net/CalmQuest?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err.message}`);
  });

// Use your routes module
app.use("/", routes);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
