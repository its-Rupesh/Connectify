import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// MongoDB Connection
const connectDB = (url) => {
  mongoose
    .connect(url, { dbName: "Connectify" })
    .then((data) => console.log(`MongoDb Connected to ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

// cookie Options
const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

// cookies sending(res,user,201,"user created")
const sendToken = (res, user, code, message) => {
  // sign() function, which creates a token from jwt.
  // syntax jwt.sign(payload,secretOrPrivateKey,options)
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // .cookie("Cookie Name");
  return res
    .status(code)
    .cookie("Connectify-Token", token, cookieOptions)
    .json({
      success: true,
      message,
    });
};
export { connectDB, sendToken, cookieOptions };
