import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken,addVideo)


//update a video
router.put("/:id", verifyToken,updateVideo)


//delete a video
router.delete("/:id", verifyToken,deleteVideo)

//find a video do not need verify
router.get("/find/:id", getVideo)

//add views of video
router.put("/view/:id",addView)

//get trend video
router.get("/trend",trend)

//get random video
router.get("/random",random)

//get subscribed channel videos
router.get("/sub",verifyToken,sub)


//get tags video
router.get("/tags",getByTag)

//get search video
router.get("/search",search)

export default router;