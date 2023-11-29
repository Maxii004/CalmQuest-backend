import httpStatus from "http-status";
import * as userService from "../services/user.services.js";

export const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user)
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  res.status(httpStatus.OK).json({ user });
};

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(httpStatus.OK).json({ users });
};

export const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(httpStatus.OK).json({ user });
};
