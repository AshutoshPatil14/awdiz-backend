import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  const { email, password } = req.body || {};

  // check for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields", success: false });
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (user.email !== email) {
    return res.status(404).json({ message: "User not found", success: false });

    //check for correct credentials
  } else if (user.email === email) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password", success: false });
    } else if (isPasswordCorrect) {
      // Send the user document to frontend
      // console.log(user);
      // create a token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      // console.log(token,"token")

      // set the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.status(200).json({
        success: true,
        message: `Hello ${user.name}, You're logged in!`,
        user: { userId: user._id, name: user.name, email: user.email },
      });
    }
  }
};

export const Register = async (req, res) => {
  // console.log(req.body, "req");

  const { name, email, password } = req.body || {};

  //check for empty fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill the missing fields", success: false });
  }

  // check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists", success: false });
  }
  // console.log(req.body, "req");
  // res.send(req.body)

  // create new user
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "Thanks for registering!\nYou can now log in.", success: true });
};

export const getCurrentUser = async (req, res) => {
  try{
    const token = req.cookies.token
    console.log("Token form cookies", token)
    return res.status(200).json({
      message: "Login Successful",
      success: true,
      
    })
  }catch(error){
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
}