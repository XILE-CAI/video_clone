import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParse from "cookie-parser";

const app = express();
//configure .env
dotenv.config()

//connect to mongodb
const connect = () => {
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connect to MongoDB!")
    }).catch((err) =>{
        throw err;
    });
}

//must have ()
app.use(cookieParse())
app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//handle error 
app.use((err, req,res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something wnet wrong!"
    return res.status(status).json({
        suceess:false,
        status:status,
        message:message
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to Server!")
}) 