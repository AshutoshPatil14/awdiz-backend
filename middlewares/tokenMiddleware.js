import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

export const tokenDecoder = async (req, res, next) => {
  try {

    if (req.path === "/api/v1/auth/login" || req.path === "/api/v1/auth/register") {
      return next();
    }

    const token = req.cookies.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.userId);
      req.user = user;
    }
    next();
  } catch (error) {
    console.log(error, "tokenDecoder error");
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
