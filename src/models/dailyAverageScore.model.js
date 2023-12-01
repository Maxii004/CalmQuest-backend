import { Schema, model } from "mongoose";
import { DEPRESSION_SEVERITY } from "../config/constants.js";

const dailyAverageScoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dailyAverageScore: {
      type: Number,
    },
    depressionSeverity: {
      type: String,
      enum: [DEPRESSION_SEVERITY],
    },
  },
  {
    timestamps: true,
  }
);

const DailyAverageScore = model("DailyAverageScore", dailyAverageScoreSchema);

export default DailyAverageScore;
