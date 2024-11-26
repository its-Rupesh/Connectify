import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminKey } from "../app.js";
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
const isAdminAuthenticated = async (req, res, next) => {
  try {
    const Token = req.cookies["Connectify-admin-Token"];
    if (!Token) return next(new ErrorHandler("Only Admin Can Access", 401));
    const secretKey = jwt.verify(Token, process.env.JWT_SECRET);
    const isMatch = secretKey === adminKey;
    if (!isMatch) return next(new ErrorHandler("Invalid Secret Key", 401));

    next();
  } catch (error) {
    next(error);
  }
};
export { isAuthenticated, isAdminAuthenticated };
