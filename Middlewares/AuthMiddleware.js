import User from "../Models/userModel.js";
import Admin from "../Models/adminModel.js";
import 'dotenv/config';
import jwt from "jsonwebtoken";
export const getAccessToken = ()=>{
  return sessionStorage.getItem('accesstoken');

}


export const userVerification = (req, res) => {
  // const token = req.cookies.token
  if (!getAccessToken) {
    return res.json({ status: false })
  }
  //console.log(token);
  jwt.verify(getAccessToken, process.env.A_S_K, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      const admin = await Admin.findById(data.id);
      if (user) return res.json({ status: true, isAdmin: false })
      else if (admin) return res.json({ status: true, isAdmin: true })
      else return res.json({ status: false })
    }
  })
}

export const adminVerification = (req, res) => {
  // const token = req.cookies.token;
  if(!getAccessToken) {
    return res.json({ status: false });
  }

  jwt.verify(getAccessToken, process.env.A_S_K, async(err, data) => {
    if(err) {
      return res.json({ status: false });
    } else {
      const admin = await Admin.findById(data.id);
      if(admin) {
        return res.json({ status: true })
      } else {
        return res.json({ status: false })
      }
    }
  })
}