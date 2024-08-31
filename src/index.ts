import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/database'
import AuthRouter from './router/auth'
import ConnectionRouter from './router/connection'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const PORT=process.env.PORT
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true
}))
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is running"
    })
})
app.use('/api/v1/auth/',AuthRouter)
app.use('/api/v1/connection',ConnectionRouter)
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
connectDB()
