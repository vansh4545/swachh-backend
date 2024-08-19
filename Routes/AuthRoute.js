import { Signup, Login, AdminSignup , } from '../Controllers/AuthController.js';
import express from "express";
const router = express.Router();
import {userVerification} from "../Middlewares/AuthMiddleware.js";


router.post('/',userVerification);


router.post('/signup', Signup)
router.post('/login', Login)
router.post('/adminsignup', AdminSignup)

export default router;