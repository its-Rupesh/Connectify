import { User } from "../models/user.js";

//Create New User and Save it to Database and cookies
const newUser = async (req, res) => {
  const avatar = { public_id: "asdfg", url: "cvbnm" };

  await User.create({
    name: "Rupesh",
    username: "Rupesh@1983",
    password: "Rupesh#1976",
    avatar,
  });
  res.status(201).json({ status: "User CREATED" });
};
const login = (req, res) => {
  res.send("Hello From login");
};

export { login, newUser };
