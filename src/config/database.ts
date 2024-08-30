import mongoose  from "mongoose";
export const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.DB_URL!)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("error in db connection")
    }
}

