import express from "express";
import { signup, signin,googleAuth} from "../controllers/auth.js";

//authentication
const router = express.Router();

//create a user channel 
router.post('/signup', signup)


//sign in
router.post('/signin', signin)


//google auth
router.post('/google',googleAuth)


export default router;
