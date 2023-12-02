import httpStatus from "http-status";
import { DailyAverageScore } from "../models/index.js";
import ApiError from "../utils/apiError.js";
import { DAILY_AVERAGE_SCORE_POPULATE_ATTRIBUTES } from "../config/constants.js";

export const addDailyAverageScore = async (reqBody) => {
  const existingAttempt = await DailyAverageScore.find({
    userId: reqBody.userId,
    date: reqBody.date,
  });
  if (existingAttempt.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Daily Average Score for this date already exists"
    );
  }
  const dailyAverageScore = await DailyAverageScore.create(reqBody);
  return dailyAverageScore;
};

export const getDailyAverageScores = async (id) => {
  const options = {
    sort: { date: 1 },
    populate: {
      path: "userId",
      select: DAILY_AVERAGE_SCORE_POPULATE_ATTRIBUTES.USER,
    },
  };
  try {
    const dailyAverageScores = await DailyAverageScore.find(
      { userId: id },
      {},
      options
    );
    return dailyAverageScores;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export default {
  addDailyAverageScore,
  getDailyAverageScores,
};
