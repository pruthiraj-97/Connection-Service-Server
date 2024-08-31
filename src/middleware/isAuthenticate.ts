import { Request,Response,NextFunction } from 'express'
import JWT  from 'jsonwebtoken'
export const isAuthenticate= async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.token
        console.log("token is ",token)
        if(!token){
            res.status(401).json({
                status:401,
                data:null,
                error:{
                    message:"Please login first"
                }
            })
        }
        await JWT.verify(token,process.env.JWT_SECRET!,(err:unknown,payload:unknown)=>{
            if(err){
                return res.status(401).json({
                    status:401,
                    data:null,
                    err:{
                        message:"Token expired"
                    }
                })
            }
            console.log(payload)
        })
        next()
    } catch (error) {
        res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"somethink went wrong in Token verification"
            }
        })
    }
}

export const getUser=async (req:Request)=>{
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token||typeof token !== 'string'){
            throw new Error('Invalid token')
        }
        const payload =JWT.verify(token,process.env.JWT_SECRET!)
        if(typeof payload === 'string'){
            throw new Error('Invalid token')
        }
        return payload
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error; 
    }
}