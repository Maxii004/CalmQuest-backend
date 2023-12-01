import Jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import httpStatus from "http-status";
import * as userService from "../services/user.services.js";
import logger from "../middleware/logger.js";
//
const createAccessToken = (id, name, email) => {
  return Jwt.sign(
    { userId: id, userName: name, userEmail: email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
//
const createRefreshToken = (id, name, email) => {
  return Jwt.sign(
    { userId: id, userName: name, userEmail: email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
//
export const signUp = expressAsyncHandler(async (req, res) => {
  try {
    const existingUser = await userService.getUserbyEmail(req.email);
    if (existingUser)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "User already exists" });
    const user = await userService.addUser(req.body);
    const accessToken = createAccessToken(user?._id, user?.name, user?.email);
    const refreshToken = createRefreshToken(user?._id, user?.name, user?.email);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(httpStatus.CREATED)
      .json({ email: user?.email, accessToken: accessToken });
  } catch (error) {
    if (error.statusCode === 400) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: error?.message });
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }
});
//
export const login = expressAsyncHandler(async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
    }
    //
    const accessToken = createAccessToken(user?._id, user?.name, user?.email);
    const refreshToken = createRefreshToken(user?._id, user?.name, user?.email);
    //
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //
    res.status(httpStatus.OK).json({
      message: "User logged in successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    if (error.status === httpStatus.UNAUTHORIZED) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: error.message });
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
});
//
export const refresh = (req, res) => {
  const cookies = req?.cookies;
  //
  if (!cookies?.jwt) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized user" });
  }
  //
  const refreshToken = cookies.jwt;
  //
  Jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err)
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: "Invalid token" });
      //
      const foundUser = await userService.getUserbyEmail(user.userEmail);
      //
      if (!foundUser)
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized user" });
      //
      const accessToken = createAccessToken(foundUser._id, foundUser.email);
      //
      res.status(httpStatus.OK).json({ accessToken: accessToken });
    }
  );
};
//
export const logout = (req, res) => {
  const cookies = req?.cookies;
  //
  if (!cookies?.jwt) {
    logger.info(cookies);
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized user" });
  } //
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(httpStatus.OK).json({ message: "Logout successfully" });
};
