import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js";
import complaintRoute from "./Routes/ComplaintRoute.js";
//const { MONGO_URL, PORT } = process.env;

mongoose.connect('mongodb+srv://vanshgupta4545:25July2003@cluster0.qxdgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected!!')
  });
  app.use(cors());
  //app.use(cors({ credentials: true, origin: ' https://swachh-tracker.vercel.app/' }));
  
  // ... other middleware and route handling
  
  const PORT = 8000;
  app.listen(process.env.port || PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/request", complaintRoute)