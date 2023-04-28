const express = require('express');
const { userModel } = require('../model/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const authRouter = express.Router()


authRouter.post("/register",async(req,res)=>{
    let {email,password,username} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
            let user = await userModel({email,username,password:hash})
            await user.save()
            res.status(200).send({"msg": "user registerd successfully"})
        });
               
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        let user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({ course: 'backend' }, 'masai');
                    res.status(200).send({"msg":"user login successful","token":token})
                }else{
                    res.status(400).send({"err": "user login failed"})
                }
            });           
        }else{
            res.status(400).send({"err": "User not found"})
        }
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = { authRouter}