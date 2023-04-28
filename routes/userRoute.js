const express = require("express")
const { productModel } = require("../model/product.model")


const userRouter = express.Router()

userRouter.get("/products", async(req,res)=>{
    try {
        const user = await productModel.find()
        res.status(200).send( user )    
    } catch (error) {
        res.status(400).send({"err":error.message})
    }  
})

// post
userRouter.post("/create",async(req,res)=>{
    try {
        let data = await productModel.create(req.body)
        if(data){
            res.status(200).send({msg: "Product added successfully"})
        }else{
            res.status(400).json({msg: "Error creating product"})
        }       
    } catch (error) {
        res.json({msg: error.message})
    }
   
})


userRouter.patch("/:id",async(req,res)=>{
    try {
        let updatedUser = await userModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        if(!updatedUser){
            res.json({err:"Something is wrong while updating the user"})
        }
        res.status(200).json({msg:"updated user"})

    } catch (error) {
        res.json({msg: "User updation failed"})
    }
   
})

userRouter.delete("/:id",async(req,res)=>{
    try {
        let user = await userModel.findByIdAndDelete({_id:req.params.id})
        if(!user){
            res.json({err:"User not found"})
        }
        res.status(200).json({msg:"Successfully deleted"})

    } catch (error) {
        res.json({msg: "User updation failed"})
    }
   
})


module.exports = {userRouter}