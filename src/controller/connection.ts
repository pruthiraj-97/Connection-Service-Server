import { Request,Response } from "express"
import { Types } from "mongoose"
import {UserModel} from "../model/user.model"
export const follow= async (req:Request,res:Response)=>{
    try {
        let userId=req.query.userId
        let followerId=req.query.followerId
        if(!userId||!followerId){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"Enter user and follower id"
                }
            })
        }
        if(typeof followerId!="string"||typeof userId!="string"){
            return res.status(400).json({
                status:400,
                data:null,
                error:{
                    message:"Enter user and follower id"
                }
            })
        }
        const user = await UserModel.findOne({ _id: followerId });
        console.log(user)
        if (user && user.friends.includes(new Types.ObjectId(userId))) {
            return res.status(200).json({
                status: 400,
                data: null,
                error: {
                    message: "Already follow"
                }
            });
        }
        await UserModel.updateOne({ _id: followerId }, { $push: { friends: userId } });
        return res.status(200).json({status:200,
            data:{
                message:"followed"
            },
            error:null
        })
    }
    catch (error) {
        return res.status(500).json({status:500,data:null,error:{message:"something went wrong"}})
    }
}