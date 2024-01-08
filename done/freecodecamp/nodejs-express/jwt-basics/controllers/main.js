import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { BadrequestError } from "../errors/index.js";

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //mongoose validation, JOI, check in the controller
  if (!username || !password) {
    throw new BadrequestError("Please provide a index.password");
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
});

const dashboard = asyncHandler(async (req, res) => {
  
  const luckyNumber = math.random() * 100;
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
 
  
});

export { login, dashboard };
