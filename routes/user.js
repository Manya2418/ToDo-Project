import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";

const routes=express.Router();

// routes.get("/all",getAllusers) 

// routes.post("/new",NewUser) 

routes.post("/new",Register)
routes.post("/login",Login)


routes.get("/logout",Logout)

// by using query
// routes.get("/userid",async(req,res)=>{
//      const {id}=req.query;
//     // const id=req.query.id
//     // console.log(id)
//     // console.log(req.query)
//     const usr=await user.findById(id)
//     res.json({
//         success:true,
//         usr,
//     })
// })

// routes.get("/userid/:id",UserbyId)
// routes.put("/userid/:id",UpdateUserbyId)
// routes.delete("/userid/:id",DeleteUserbyId) 
// or we can also write like this
// routes.route('/userid/:id')
//     .get(UserbyId)
    // .put(UpdateUserbyId)
    // .delete(DeleteUserbyId)



export default routes;