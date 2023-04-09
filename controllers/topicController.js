const topicModel = require("../model/topicModel")



const createtopic = async function(req,res){
    try {
        let data = req.body
        if(!data.subjectId){
            return res.status(400).send({success : false,message : "please provide subjectId"})
        }
        data.logo = req.files.logo && req.files.logo.length > 0? req.files.logo[0].path : null
        data.pdfFile = req.files.pdfFile && req.files.pdfFile.length > 0? req.files.pdfFile[0].path : null
        let createtopic = await topicModel.create(data)
        return res.status(200).send({success : true,message : "successfully created your topic",data : createtopic})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const getAlltopicbySubjectId = async function(req,res){
    try {
        // if(req.query.disable === "true" || req.query.disable === "false"){
        // let getAlltopic = await topicModel.find({disable :req.query.disable})
        // return res.status(200).send({success : true , message : "successfully fetched all topic ",data : getAlltopic})
        // }
        let getAlltopic = await topicModel.find({subjectId : req.params.subjectId})
        if(!getAlltopic.length) return res.status(200).send({success : true, message : "topic not found"})
        return res.status(200).send({success : true , message : "successfully fetched all topic ",data : getAlltopic})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const gettopicById = async function(req,res){
    try {
        let gettopicById = await topicModel.findOne({_id : req.params.topicId})
        if(!gettopicById){
        return res.status(404).send({success : false,message : "your course not found"})
        }
        return res.status(200).send({success : true,message : "successfully fetched your course",data : gettopicById})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}



const updatetopic = async function(req,res){
    try {
        let gettopicById = await topicModel.findOne({_id : req.params.topicId})
        if(!gettopicById){
        return res.status(404).send({success : false,message : "your course not found"})
        }
        let logo = req.files.logo && req.files.logo.length > 0 ? req.files.logo[0].path : gettopicById.logo
        let pdfFile = req.files.pdfFile && req.files.pdfFile.length > 0 ? req.files.pdfFile[0].path : gettopicById.logo
        if(req.files.logo && req.files.logo.length > 0){
            let imagePath = gettopicById.logo
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

          
          if(req.files.pdfFile && req.files.pdfFile.length > 0 ){
            let imagePath = getsubjectById.pdfFile
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
       
        let updatetopic = await topicModel.findOneAndUpdate({_id : req.params.topicId},{$set : {topicName :req.body.topicName ,pdfFile :pdfFile,subjectId : req.body.subjectId,logo : logo}},{new : true})
        return res.status(200).send({success : true ,message : "successfully updated your course",data :updatetopic })
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const deletetopic = async function(req,res){
    try {

       let updateDisable = await topicModel.findOneAndDelete({_id :req.params.topicId})
       return res.status(200).send({success : true, message : "topic is successfully deleted "})

    } catch (error) {
       return res.status(500).send({success : false, message : error.message})
    }
}


module.exports = {createtopic,getAlltopicbySubjectId,gettopicById,updatetopic,deletetopic}
