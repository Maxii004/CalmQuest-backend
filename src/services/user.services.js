import User from "../models/user.model.js";

export const addUser = async (reqbody) => {
  const existingUser = await User.findOne({ email: reqbody.email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  try {
    const user = await User.create(reqbody);
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserbyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(error.message);
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
  try {
    const user = await getUserbyEmail(userBody.email);
    if (!user) throw new Error("User not found");
    if (user.password === userBody.password) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
