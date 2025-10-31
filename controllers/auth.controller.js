import User from "../models/user.schema.js";

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
    if(user.password!==password){
      return res.status(401).send("Incorrect password");
    }else if(user.password===password){
      return res.status(200).send(`Hello ${user.name}, You're logged in!`);
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
  console.log(req.body, "req");
  // res.send(req.body)
  
  // create new user
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).send("Thanks for registering!\nYou can now log in.");
};
