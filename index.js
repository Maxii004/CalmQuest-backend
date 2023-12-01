import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import routes from "./src/routes/index.js";
import logger from "./src/middleware/logger.js";
import connectDB from "./src/config/db-connection.js";
import credentials from "./src/middleware/credentials.js";
import corsOptions from "./src/config/cors-options.js";
import allowedOrigins from "./src/config/allowed-origins.js";

dotenv.config();
const { json, urlencoded } = bodyParser;
const port = process.env.PORT;

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

// Connect to MongoDB database
connectDB();

// Use routes module
app.use("/", routes);

// Start the server
const server = app.listen(port, () =>
  logger.info(`Server running on port ${port}`)
);

// Attach Socket.io to the server
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins, // Adjust as per your front-end URL
    methods: ["GET", "POST"],
  },
});

// Listen for Socket.io connections
io.on("connection", (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on("setup", (userData) => {
    socket.join(userData.userId);
    socket.emit("connected");
  });

  // Join the default room
  socket.on("joinRoom", () => {
    socket.join("default-room");
    logger.info(`${socket?.id} joined the room`);
  });

  socket.on("typing", () => socket.in("default-room").emit("typing"));
  socket.on("stop typing", () => socket.in("default-room").emit("stop typing"));

  // Listen for message events
  socket.on("sendMessage", (messageData) => {
    // Broadcast message to all clients in the room
    socket.broadcast.to("default-room").emit("message received", messageData);
  });

  socket.off("setup", () => {
    logger.info(`User disconnected: ${socket?.id}`);
    socket.leave("default-room");
  });
});
