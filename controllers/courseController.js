const courseModel = require("../model/courseModel")
const fs = require("fs");



const createcourse = async function(req,res){
    try {
        let data = req.body
        data.logo = req.file ? req.file.path : null
        let createcourse = await courseModel.create(data)
        return res.status(200).send({success : true,message : "successfully created your course",data : createcourse})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const getAllcourse = async function(req,res){
    try {
        // if(req.query.disable === "true" || req.query.disable === "false"){
        // let getAllcourse = await courseModel.find({disable :req.query.disable})
        // return res.status(200).send({success : true , message : "successfully fetched all course ",data : getAllcourse})
        // }
        let getAllcourse = await courseModel.find()
        return res.status(200).send({success : true , message : "successfully fetched all course ",data : getAllcourse})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const getcourseById = async function(req,res){
    try {
        let getcourseById = await courseModel.findOne({_id : req.params.courseId})
        if(!getcourseById){
        return res.status(404).send({success : false,message : "your courseId not found"})
        }
        return res.status(200).send({success : true,message : "successfully fetched your course",data : getcourseById})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const updatecourse = async function(req,res){
    try {
        let getcourseById = await courseModel.findOne({_id : req.params.courseId})
        if(!getcourseById){
        return res.status(404).send({success : false,message : "your course not found"})
        }
        let logo = req.file ? req.file.path : getcourseById.logo
        if(req.file){
            let imagePath = getcourseById.logo
                if(imagePath != null){
                    fs.unlink(imagePath, (err) => {
                        if (err)
                          return res.status(400).send({
                            success: false,
                            message: "image cannot be removed from uploads",
                          });
                      });
            }
         
        }
        let updatecourse = await courseModel.findOneAndUpdate({_id : req.params.courseId},{$set : {description : req.body.description,logo : logo}},{new : true})
        return res.status(200).send({success : true ,message : "successfully updated your course",data :updatecourse })
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const deletecourse = async function(req,res){
    try {
       let getcourse = req.getcourse
       let updateDisable = await courseModel.findOneAndDelete({_id :req.params.courseId})
       return res.status(200).send({success : true, message : "course is successfully deleted "})
    } catch (error) {
       return res.status(500).send({success : false, message : error.message})
    }
}


module.exports = {createcourse,getAllcourse,getcourseById,updatecourse,deletecourse}
 



      