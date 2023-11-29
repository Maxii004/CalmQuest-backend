import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
  },
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuestionResponse",
      autoPopulate: true,
    },
  ],
});

const Question = model("Question", questionSchema);

export default Question;
