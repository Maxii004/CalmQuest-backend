import * as userService from "../services/user.services.js";
// import { catchAsync } from "../utils/catchAsync.js";

export const addUser = async (req, res) => {
  const user = await userService.addUser(req.body);
  res.status(201).json({ user });
};

export const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
};

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ users });
};

export const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
};

export const loginUser = async (req, res) => {
  const user = await userService.loginUser(req.body);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ user });
};
