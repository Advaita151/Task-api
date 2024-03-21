import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import taskRoute from "./routes/taskRoute.js"
import subTaskRoute from "./routes/subTaskRoute.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT 
const mongoDB = process.env.MONGODB_URI

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/task",taskRoute)
app.use("/subTask",subTaskRoute)

mongoose.connect(mongoDB)
    .then(()=>{
        console.log("App is connected to mongoose")
        app.listen(PORT, () =>{
            console.log(`Listening to port ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })