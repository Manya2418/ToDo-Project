import mongoose from 'mongoose'
const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        reference:"user",//similar to the user kai Schema ka collection
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Task=mongoose.model("Task",schema)