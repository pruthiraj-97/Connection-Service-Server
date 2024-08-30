import {Request,Response} from 'express'
import {signUpData} from '../utils/zod'
import bcrypt from 'bcryptjs'
import { UserModel } from '../model/user.model'

export const Register=async (req:Request,res:Response)=>{
    try {
        const payload={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        const isValidate=signUpData.safeParse(payload)
        console.log(isValidate)
        if(!isValidate.success){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"Enter all validate data"
                }
            })
        }  
        const isExist=await UserModel.findOne({email:payload.email})
        if(isExist){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"user already exist"
                }
            })
        }
        const hashPassword=bcrypt.hashSync(payload.password,10)
        const result=await UserModel.create({
            name:payload.name,
            email:payload.email,
            password:hashPassword
        })
        return res.status(200).json({
            status:200,
            data:{
                user:result
            },
            error:null
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"something went wrong"
            }
        })
    }
}