import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const Token = req.cookies["Connectify-Token"];
    if (!Token) return next(new ErrorHandler("Please Login", 401));
    // Decode the Cookie using secret key
    const decodeData = jwt.verify(Token, process.env.JWT_SECRET);
    // Creating custom para in req of name user
    req.user = decodeData._id;
    next();
  } catch (error) {
    next(error);
  }
};
export { isAuthenticated };
