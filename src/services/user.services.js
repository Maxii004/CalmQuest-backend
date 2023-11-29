import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

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
  try {
    const user = await User.findById(id);
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
