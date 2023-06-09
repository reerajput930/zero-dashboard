const express = require("express")
const router = express.Router()
const taskModel = require('../model/task')


// creating api for fetching data
const alltasks =async (req,res)=>{
    try {
        const tasks = await taskModel.find({})
        res.status(200).json({status:"success",tasks:tasks})
        
    } catch (error) {
        console.log("problem in alltasks")
        res.status(404).json({status:"failed"})
    }
        
}

// creating api for fetching single data
const singletask = async (req,res)=>{
    console.log(req.params.id)
    try {
        const task = await taskModel.findById({"_id":req.params.id})
        res.status(200).json({ status: "success", task: task })
        
    } catch (error) {
        console.log(error.message)
        res.status(404).json({status:"failed"})
    }
}

// updating api for single task
const singleupdate = async(req,res)=>{
    const {taskDesc,tags} = req.body
    console.log(req.body)
    try {
        const task = await taskModel.findByIdAndUpdate({"_id":req.params.id},{taskDesc:taskDesc , tags :tags})
        res.status(200).json({status:"success"})
        
    } catch (error) {
        console.log(error.message)
        res.status(404).json({status:"failed"})
    }
}


//  creating api for adding task 
const addtask =async (req,res)=>{
    try {
        const user = await taskModel.create({            
            taskDesc:req.body.taskDesc, 
            tags:req.body.tags
        }) 
        console.log(user) 
         res.status(200).json({status:"success"})
        
    } catch (error) {
         console.log("problem in addtask")
         console.log(error)
         res.status(404).json({status:"failed"})
    }
}

// creating api for updating the task
const updatetask =async(req,res)=>{
    try {
        const   user = await taskModel.findByIdAndUpdate(req.body._id,{category: req.body.category})  
        res.status(200).json({status:"success"})
        
    } catch (error) {
        console.log("problem in update")
        res.status(404).json({status:"failed"})
    }
}

// creating api for deleting the data
const deletetask =async(req,res)=>{
    try {
        
        const user = await taskModel.findByIdAndDelete(req.body._id)
        res.status(200).json({status:"success"})
        
    } catch (error) {
        console.log("problem in delete apii")
        res.status(404).json({status:"failed"})
               
    }
}


// updating the desc
const descupdate =async(req,res)=>{
    try {
        const   user = await taskModel.findByIdAndUpdate(req.body._id,{taskDesc: req.body.taskDesc})  
        res.status(200).json({status:"success"})
        
    } catch (error) {
        console.log("problem in update")
        res.status(404).json({status:"failed"})
    }
}

module.exports ={
    alltasks,
    singletask,
    singleupdate,
    addtask,
    updatetask,
    deletetask,
    descupdate

}
