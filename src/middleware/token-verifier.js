import httpStatus from "http-status";
import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  //
  if (!authHeader?.startsWith("Bearer "))
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized user" });
  //
  const accessToken = authHeader.split(" ")[1];
  //
  Jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Invalid token" });
    //
    req.user = user;
    next();
  });
};
//
export default verifyToken;
