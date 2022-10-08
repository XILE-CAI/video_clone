import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import {createError} from "../error.js"
import jwt from "jsonwebtoken"

//signup function
export const signup = async (req,res,next) => {
    console.log(req.body)
    try {
        //create a new user and make password unsee using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //add {} 
        const newUser = new User({...req.body, password:hash});

        //send to mongoDB
        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        //handle error
        next(err)
    }
} 

//sign In function and access token
export const signin = async (req,res,next) => {
    console.log(req.body)
    try {
        //the user we finded
        const user = await User.findOne({name:req.body.name})
        if(!user) return next(createError(404,"User not found!"))

        //compare password
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(400,"Wrong credentials!"))

        //access token for user
        const token = jwt.sign({id:user._id},process.env.JWT)
        //hide password
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly:true
        })
        .status(200)
        .json(others);
    } catch (err) {
        //handle error
        next(err)
    }
} 

//google auth
export const googleAuth = async (req,res,next) => {
    try {
        //if user already exist
        const user =await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly:true,
            }).status(200).json(user._doc);
        }else{
            //if user not exist,create a new user
            const newUser = new User({
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id}, process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly:true,
            }).status(200).json(savedUser._doc);
            
        }
    } catch (err) {
        next(err);
    }
}