import mongoose, { Schema, model } from "mongoose";

// Schema for User When he login || Sign in
const schema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  // timestamp creates 2 col created at ,Updated at
  { timestamps: true }
);

// models is an object in Mongoose that holds references to all models c
// models.Users check if there is already model named User
export const User = mongoose.models.User || model("User", schema);
