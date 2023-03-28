const express = require("express")
const router = express.Router()
const userModel = require("../model/authentication")

const jwt = require('jsonwebtoken')

// creating json token
const createToken = (_id)=>{    
    // payload,secret token and expiresIn
    return jwt.sign({_id},'mynameisRiya',{expiresIn:'3d'})
}


const login = async (req,res)=>{
  
    const {email,password}= req.body
    try {
        const user = await userModel.login(email,password)
        const token = createToken(user._id)
        
        const firstName = user.firstName
        const lastName = user.lastName
        res.status(200).json({email,token,firstName,lastName})
        
    } catch (error) {
        console.log("hello")
        console.log(error.message) 
        res.status(404).json({error:error.message})
    }

}

const signup =async (req,res)=>{
    const{firstName,lastName,linkedin,userdesc,status,image,email,password}=
    req.body;
    try {
        const user = await userModel.signup(
            firstName,
            lastName,
            linkedin,
            userdesc,
            status,
            image,
            email,
            password,

        )
        const token = createToken(user._id)
        // console.log(user,token)
        res.status(200).json({email,token,firstName,lastName})
         
      } catch (error) {
         
        console.log(error.message) 
        res.status(404).json({error:error.message})
      }
}


const allusers = async (req,res)=>{
    try { 
        const profiles = await userModel.find({})
        console.log(profiles)
        res.status(200).json({status:"success",users:profiles})
        
    } catch (error) {
         res.status(404).json({status:"failed"})
    }
}


module.exports = {
    login,
    signup,
    allusers
}