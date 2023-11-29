import { Schema, model } from "mongoose";

const userResponseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  responseId: {
    type: Schema.Types.ObjectId,
    ref: "QuestionResponse",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserResponse = model("UserResponse", userResponseSchema);

export default UserResponse;
