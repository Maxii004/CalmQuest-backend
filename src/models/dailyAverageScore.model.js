import { Schema, model } from "mongoose";

const dailyAverageScoreSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dailyAverageScore: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DailyAverageScore = model("DailyAverageScore", dailyAverageScoreSchema);

export default DailyAverageScore;
