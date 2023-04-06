const subjectModel = require("../model/subjectModel")



const createsubject = async function(req,res){
    try {
        let data = req.body
        if(!data.courseId){
            return res.status(400).send({success : false,message : "please provide courseId"})
        }
        data.logo = req.file ? req.file.path : null
        let createsubject = await subjectModel.create(data)
        return res.status(200).send({success : true,message : "successfully created your subject",data : createsubject})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const getAllsubjectbycourseId = async function(req,res){
    try {
        // if(req.query.disable === "true" || req.query.disable === "false"){
        // let getAllsubject = await subjectModel.find({disable :req.query.disable})
        // return res.status(200).send({success : true , message : "successfully fetched all subject ",data : getAllsubject})
        // }
        let getAllsubject = await subjectModel.find({courseId : req.params.courseId})
        if(!getAllsubject.length) return res.status(200).send({success : true, message : "subject not found"})
        return res.status(200).send({success : true , message : "successfully fetched all subject ",data : getAllsubject})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const getsubjectById = async function(req,res){
    try {
        let getsubjectById = await subjectModel.findOne({_id : req.params.subjectId})
        if(!getsubjectById){
        return res.status(404).send({success : false,message : "your course not found"})
        }
        return res.status(200).send({success : true,message : "successfully fetched your course",data : getsubjectById})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const updatesubject = async function(req,res){
    try {
        let getsubjectById = await subjectModel.findOne({_id : req.params.subjectId})
        if(!getsubjectById){
        return res.status(404).send({success : false,message : "your course not found"})
        }
        let logo = req.file ? req.file.path : getsubjectById.logo
        if(req.file){
            let imagePath = getsubjectById.logo
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
        let updatesubject = await subjectModel.findOneAndUpdate({_id : req.params.subjectId},{$set : {subject :req.body.subject ,language :req.body.language,courseId : req.body.courseId,logo : logo}},{new : true})
        return res.status(200).send({success : true ,message : "successfully updated your course",data :updatesubject })
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}

const deletesubject = async function(req,res){
    try {
      
       let updateDisable = await subjectModel.findOneAndDelete({_id :req.params.subjectId})
       return res.status(200).send({success : true, message : "subject is successfully deleted "})
    } catch (error) {
       return res.status(500).send({success : false, message : error.message})
    }
}



module.exports = {createsubject,getAllsubjectbycourseId,getsubjectById,updatesubject,deletesubject}
 


