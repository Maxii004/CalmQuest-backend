import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Chat = model("Chat", chatSchema);

export default Chat;
