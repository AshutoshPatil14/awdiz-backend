import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const { email, password } = req.body || {};

  // check for empty fields
  if (!email || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  // check for existing user
  const user = await User.findOne({ email });
  if (user.email!==email) {
    return res.status(404).send("User not found");

    //check for correct credentials
  }else if(user.email===email){
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(401).send("Incorrect password");
    }else if(isPasswordCorrect){
      // Send the user document to frontend
      return res.status(200).json({
        success: true,
        message: `Hello ${user.name}, You're logged in!`,
        user: user
      });
    }
  }
};


export const Register = async (req, res) => {

  // console.log(req.body, "req");

  const {name, email, password } = req.body || {};
  
  //check for empty fields
  if (!name || !email || !password) {                     
    return res.status(400).send("Please fill the missing fields");
  }
  
  // check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send("User already exists");
  }
  // console.log(req.body, "req");
  // res.send(req.body)
  
  // create new user
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).send("Thanks for registering!\nYou can now log in.");
};
