import { Schema, model } from "mongoose";
import { DEPRESSION_SEVERITY } from "../config/constants.js";

const dailyAverageScoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dailyAverageScore: {
      type: Number,
      required: true,
    },
    depressionSeverity: {
      type: String,
      enum: [DEPRESSION_SEVERITY],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DailyAverageScore = model("DailyAverageScore", dailyAverageScoreSchema);

export default DailyAverageScore;
