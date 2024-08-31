import { Request,Response } from "express"
import { Types } from "mongoose"
import {UserModel} from "../model/user.model"
import { getUser } from '../middleware/isAuthenticate'
export const follow= async (req:Request,res:Response)=>{
    try {
        let payload=await getUser(req)
        let userId=req.params.userId
        let followerId=payload.id
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


export const getConnectionChain = async (req: Request, res: Response) => {
    try {
        const sourceId = req.query.sourceId as string;
        const destinationId = req.query.DestinationId as string;

        if (!sourceId || !destinationId) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Please provide both sourceId and destinationId."
                }
            });
        }

        if (typeof sourceId !== "string" || typeof destinationId !== "string") {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "sourceId and destinationId must be strings."
                }
            });
        }
        let paths: Array<Array<Types.ObjectId>> = [];
        let isVisited = new Set<Types.ObjectId>();
        let tempPath: Array<Types.ObjectId> = [];

        async function DFS(currentId: Types.ObjectId, destinationId: Types.ObjectId) {
            if (currentId.toString() === destinationId.toString()) {
                paths.push([...tempPath]);
                return;
            }

            const user = await UserModel.findOne({ _id: currentId }).lean();
            const friends = user?.friends;

            if (friends) {
                for (const newFriend of friends) {
                    if (!isVisited.has(newFriend)) {
                        isVisited.add(newFriend);
                        tempPath.push(newFriend);
                        await DFS(newFriend, destinationId);
                        tempPath.pop();
                        isVisited.delete(newFriend);
                    }
                }
            }
        }

        const sourceObjectId = new Types.ObjectId(sourceId);
        const destinationObjectId = new Types.ObjectId(destinationId);

        tempPath.push(sourceObjectId);
        isVisited.add(sourceObjectId);

        await DFS(sourceObjectId, destinationObjectId);
        const ResultPath:Array<unknown>=[]
        
        for(const path of paths){
            let newPath:Array<unknown>=[]
            for(const node of path){
                const user=await UserModel.findById(node)
                newPath.push(user)
            }
            ResultPath.push(newPath)
        }

        return res.status(200).json({
            status: 200,
            data: {
                ResultPath
            },
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "Something went wrong."
            }
        });
    }
}

export const getAllUsers= async (req:Request,res:Response)=>{
       try {
        const payload = await getUser(req)
          if(!payload){
            res.status(400).json({status:400,data:null,error:{message:"Please login first"}})
          }
          const Users=await UserModel.find({
            _id:{$ne:payload.id}
          })
          res.status(200).json({status:200,data:Users,error:null})
       } catch (error) {
         res.status(500).json({
            status:500,
            data:null,
            error:{
                message:"Something went wrong"
            }
         })
       }
}