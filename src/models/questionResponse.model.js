import { Schema, model } from "mongoose";

const questionResponseSchema = new Schema({
  response: {
    type: String,
  },
});

const QuestionResponse = model("QuestionResponse", questionResponseSchema);

export default QuestionResponse;
