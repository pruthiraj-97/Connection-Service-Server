import mongoose, { Document } from 'mongoose'
interface IUser extends Document{
    name:string
    email:string
    password:string
    friends:mongoose.Types.ObjectId[]
}

const userSchema=new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    friends:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ]
},{timestamps:true})

export const UserModel=mongoose.model('User',userSchema)