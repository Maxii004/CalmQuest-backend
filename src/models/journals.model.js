import { Schema, model } from "mongoose";

const journalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  journal: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Journal = model("Journal", journalSchema);

export default Journal;
