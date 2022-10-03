import { json } from "express";
import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

//update function
export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {new: true}
        );

        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };
  
//delet user function
export const deleteUser = async (req,res,next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("User has been deleted");
        } catch (err) {
          next(err);
        }
      } else {
        return next(createError(403, "You can delete only your account!"));
      }
}


//getuser function
export const getUser = async (req,res,next) => {
  try{
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  }catch(err){
    next(err)
  }
}


export const subscribe = async(req,res,next) => {
    try {
      //add new user to subscribedUsers array
      await User.findByIdAndUpdate(req.user.id, {
        $push:{subscribedUsers: req.params.id}
      })
      //add subscriber number to subscribed user(not me)
      await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1}
      })
      res.status(200).json("Subscription successful!")
    } catch (error) {
      next(err)
    }
}

export const unsubscribe= async(req,res,next) => {
  try {
    //delete  user(channel) from my subscribedUsers array
    await User.findByIdAndUpdate(req.user.id, {
      $pull:{subscribedUsers: req.params.id}
    })
    //decrease 1 subscriber number from subscribed user(not me)
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers:-1}
    })
    res.status(200).json("UnSubscription successful!")
  } catch (error) {
    next(err)
  }
}


//likes and dislike
export const like = async (req,res,next) => {
  const id=req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      //only add once of using addtoset
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err)
  }
}

export const dislike = async(req,res,next) => {
  const id=req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{dislikes:id},
      $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err)
  }
}