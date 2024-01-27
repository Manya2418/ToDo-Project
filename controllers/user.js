
import {User} from "../models/user.js";
import bcrypt from 'bcrypt'
import { sendCookie } from "../util/features.js";
import { ErrorHandler } from "../middlewares/error.js";
// export const getAllusers=async (req,res)=>{
//     const users=await user.find()
//     // const keyword=req.query.keyword;
//     res.json({
//         success:true ,
//         // users:[], key value same hai thenn
//         users,
//     })
// }


// export const NewUser=async (req,res)=>{
//     const {name,email,password}=req.body
//     await user.create({
//         name,
//         email,
//         password
//     })
//     // res.send("done")

//     res.status(201).cookie("temp","loly").json({
//         success:true,
//         message:"Registered successfully"
//     })
// }

// export const SpecialRoute=(req,res)=>{
//     res.json({
//         success:true,
//         message:"just joking"
//     })
// }

// export const UpdateUserbyId=async (req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id)
//     res.send("users updated")
// }

// export const DeleteUserbyId=async (req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id)
//     await users.deleteOne();
//     res.send("user deleted")
// }
// export const UserbyId=async (req,res)=>{
//     const {id}=req.params;
//     const users=await user.findById(id)
//     res.send(users)
// }

export const Register=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await User.findOne({email});

        // if(user){
        //     return res.status(404).json({
        //         success:false,
        //         message:"user already exist"
        //     })
        // }
        if(user){return next(new ErrorHandler("user already exist",404)) }
        
        const hashedpassword=await bcrypt.hash(password,10)
        
        const users=await User.create({name,email,password:hashedpassword})
        
        sendCookie(users,res,"Registered Successfully",201);
    } catch (error) {
        next(error)
    }

}

export const Login=async (req,res)=>{
   try {
        const {email,password}=req.body; //body ya form se mila password
        const user=await User.findOne({email}).select("+password") //yaha monodb ka password
        // if(!user){
        //     return res.status(404).json({
        //         success:false,
        //         message:"Invalid email or password"
        //     })
        // }

        if(!user){return next(new ErrorHandler("Invalid email or password",404)) }
        const isMatch=await bcrypt.compare(password,user.password)
        
        // if(!isMatch){
        //     return res.status(404).json({
        //         success:false,
        //         message:"Invalid email or password"
        //     })
        // }

        if(!isMatch){return next(new ErrorHandler("Invalid email or password",404)) }

        sendCookie(user,res,`welcome back, ${user.name}`,200)
   } catch (error) {
        next(error)
   }
}

export const getMyprofile=async (req,res)=>{ 
    
    res.status(200).json({
        success:true,
        user:req.user,
    })
    
}
export const Logout=(req,res)=>{    
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
        user:req.user,
    })
    
}
