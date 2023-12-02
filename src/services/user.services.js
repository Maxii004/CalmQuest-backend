import User from "../models/user.model.js";
import dailyAvarageScoreServices from "./daily-avarage-score.services.js";
import ApiError from "../utils/apiError.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { USER_POPULATE_ATTRIBUTES } from "../config/constants.js";

export const addUser = async (reqbody) => {
  const existingUser = await User.findOne({ email: reqbody.email });
  if (existingUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User with the same email already exists"
    );
  }
  try {
    const user = {
      name: reqbody.name,
      age: reqbody.age,
      email: reqbody.email,
      password: await bcrypt.hash(reqbody.password, 12),
    };
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export const getUser = async (id) => {
  const options = {
    populate: {
      path: "latestDailyAverageScore",
      select: USER_POPULATE_ATTRIBUTES.LATEST_DAILY_AVERAGE_SCORE,
    },
  };
  try {
    const user = await User.findById(id, {}, options);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    return user;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export const getUserbyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId, userBody) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userBody);
    if (!user) throw new Error("User not found");
    const updateUser = await getUser(userId);
    return updateUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (userBody) => {
  const user = await getUserbyEmail(userBody.email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  } else if (await bcrypt.compare(userBody.password, user.password)) {
    return user;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }
};

export const addQuestionnaireAttempt = async (userId, attemptBody) => {
  const user = await getUser(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const attempt = await dailyAvarageScoreServices.addDailyAverageScore({
    userId: userId,
    depressionSeverity: attemptBody.depressionSeverity,
    date: attemptBody.date,
    dailyAverageScore: attemptBody.dailyAverageScore,
  });
  if (attempt?.id) {
    await updateUser(userId, {
      latestDailyAverageScore: attempt?.id,
    });
  }
  return attempt;
};

export const getQuestionnaireAttempts = async (id) => {
  try {
    const user = await getUser(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const attempts = await dailyAvarageScoreServices.getDailyAverageScores(id);
    return attempts;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

export default {
  addUser,
  getUser,
  getUsers,
  updateUser,
  loginUser,
  addQuestionnaireAttempt,
  getQuestionnaireAttempts,
};
