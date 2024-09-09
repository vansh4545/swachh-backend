import Admin from "../Models/adminModel.js";
import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const Signup = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname, address, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, firstname, lastname, address, createdAt });
    
    res
      .status(201)
      .json({ message: "User registered successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const AdminSignup = async (req, res, next) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Admin already exists" });
    }
    const newAdmin = await Admin.create({ email, password, firstname, lastname });
    res
      .status(201)
      .json({ message: "Admin registered successfully", success: true, newAdmin });
    next();
  } catch (error) {

    console.error(error);
  }
};

export const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      const admin = await Admin.findOne({ email });
      if(!user && !admin){
        return res.json({message:'Incorrect password or email' }) 
      }
      if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
        const accesstoken = jwt.sign(user.toJSON(),process.env.A_S_K,{expiresIn:'60m'});
        res.status(201).json({user:user,accesstoken:accesstoken, message: "User logged in successfully", success: true });
      } else if(admin) {
        const auth = await bcrypt.compare(password, admin.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
       
        const accesstoken = jwt.sign(user.toJSON(),process.env.A_S_K,{expiresIn:'60m'});
      
        res.status(201).json({accesstoken:accesstoken,message: "Admin logged in successfully", success: true });
      }
      next()
    } catch (error) {
      console.error(error);
    }
  };