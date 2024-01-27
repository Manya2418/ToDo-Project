import { ErrorHandler } from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newtask=async (req,res)=>{
    try {
        const {title,discription}=req.body;
        await Task.create({
        title,
        discription,
        user:req.user
    })
    res.status(201).json({
        success:true,
        message:"Task addedd successfully",
    })
    } catch (error) {
        next(error)
    }
}


export const getMyTask=async (req,res,next)=>{
    try {
        const userid=req.user._id
        const tasks=await Task.find({user:userid})
        if(!tasks){return next(new ErrorHandler("Task is not found",404)) }
        res.status(200).json({
            success:true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask=async (req,res,next)=>{
   
    try {
        // const {id}=req.params;
    const task=await Task.findById(req.params.id);
    
    if(!task){
    //    return next(new ErrorHandler("Taks is not found",404))
       return next(new ErrorHandler()) //retun internal server error 500 by default due to error handler
    }

    task.isCompleted=!task.isCompleted
    await task.save();

    res.status(200).json({
        success:true,
        message:"task updated"
    })
    } catch (error) {
        next(error)
    }
}
export const deleteTask=async (req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task){return next(new ErrorHandler("Task is not found",404)) }
        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"task deleted"
        })
    } catch (error) {
        next(error)
    }
}

