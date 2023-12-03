import httpStatus from "http-status";
import userService from "../services/user.services.js";

export const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user)
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  res.status(httpStatus.OK).json(user);
};

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(httpStatus.OK).json(users);
};

export const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user)
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  res.status(httpStatus.OK).json(user);
};

export const addQuestionnaireAttempt = async (req, res) => {
  const attempt = await userService.addQuestionnaireAttempt(
    req.params.id,
    req.body
  );
  res.send(attempt);
};

export const getQuestionnaireAttempts = async (req, res) => {
  const attempts = await userService.getQuestionnaireAttempts(req.params.id);
  if (!attempts)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Failed to fetch attempts" });
  res.status(httpStatus.OK).json(attempts);
};

export default {
  getUser,
  getUsers,
  updateUser,
  addQuestionnaireAttempt,
  getQuestionnaireAttempts,
};
