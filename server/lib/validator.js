import { body, check, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  check("avatar", "Please Upload Avatar").notEmpty(),
];
const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];
const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};
export { registerValidator, loginValidator, validateHandler };
