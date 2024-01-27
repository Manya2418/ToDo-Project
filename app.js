import express from 'express';
import routes from './routes/user.js'
const app=express()
import dotenv from'dotenv'
import cookieParser from 'cookie-parser';
import { getMyprofile } from './controllers/user.js';
import isAuthenticated from './middlewares/auth.js';
import taskRouter from './routes/task.js';
import { errorMiddle } from './middlewares/error.js';
import cors from 'cors'
//for sending formdata we use urlencoded middleware but for json data we use json middleware
app.use(express.json())

//using routes
app.use("/api/v1/users",routes)
app.use(cookieParser())
app.use("/api/v1/task",taskRouter)
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    //credentials means token cookies
    credentials:true,

}))

dotenv.config({
    path:'./data/config.env'
})

app.get("/",(req,res)=>{
    res.send("Nice")
    
})
app.get('/me',isAuthenticated,getMyprofile);

app.use(errorMiddle)



export  default app