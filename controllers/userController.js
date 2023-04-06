const userModel = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async function(req,res){
    try {
        let {email,password,mobile} = req.body
        
        const salt = await bcrypt.genSalt(10);

        if(email){
            let checkEmail = await userModel.findOne({ email: req.body.email});
            if (checkEmail) return res.status(400).send({ success: false, message: "email is already registerd" });
            if(!password){
                return res.status(400).send({success : false,message : "password is required"})
            }
            let hashingPassword = await bcrypt.hash(password, salt);

            let token = jwt.sign({ "userId": checkEmail._id},"Secrete-key");
            if (!token) return res.status(400).send({ success: false, message: "token is not generated" });

            res.cookie("authorization", token);


            let createUser = await userModel.create({email : req.body.email,password : hashingPassword})
            return res.status(200).send({success : true, message : "you are successfully register",data :createUser,token })
        }

        if(mobile){
            let checkMobile = await userModel.findOne({mobile : req.body.mobile})
            if (checkMobile) return res.status(400).send({ success: false, message: "mobile is already registerd" });
            if(!password){
                return res.status(400).send({success : false,message : "password is required"})
            }
            let hashingPassword = await bcrypt.hash(password, salt);

            let token = jwt.sign({ "userId": checkMobile._id},"Secrete-key");
            if (!token) return res.status(400).send({ success: false, message: "token is not generated" });
            res.cookie("authorization", token);
            
            let createUser = await userModel.create({mobile : req.body.mobile,password : hashingPassword})
            return res.status(200).send({success : true, message : "you are successfully register",data :createUser,token })
        }

    } catch (error) {
        return res.status(500).send({success : false, message : error.message })
    }
}


const signInWithEmailAndMobile= async function(req,res){
    try {
        let {email,mobile,password} = req.body
       
        
        if(email){
            let checkUser = await userModel.findOne({email : email})
            if(!checkUser) return res.status(404).send({success : false,message : "email not found, please register your self"})
            if(checkUser.disable) return res.status(200).send({success : true,message : "you are banned please contact us"})
            if( password === undefined && !password) return res.status(400).send({success : false,message : "password is required"})

            let verify = await bcrypt.compareSync(password, checkUser.password);
           
            if(!verify){
                return res.status(400).send({success : false,message : "please provide valid password"})
            }
            
            let token = jwt.sign({ "userId": checkUser._id},"Secrete-key");
            if (!token) return res.status(400).send({ success: false, message: "token is not generated" });
            res.cookie("authorization", token);

            return res.status(200).send({success: true,message : "logged in successfully",data :checkUser,token })
        }
        if(mobile){
            let checkUser = await userModel.findOne({mobile : mobile})
            if(!checkUser) return res.status(404).send({success : false,message : "mobile number not found, please register your self"})
            if(checkUser.disable) return res.status(400).send({success : false,message : "you are banned please contact us"})

            if( password === undefined && !password) return res.status(400).send({success : false,message : "password is required"})

            let verify = await bcrypt.compareSync(password, checkUser.password);
           
            if(!verify){
                return res.status(400).send({success : false,message : "please provide valid password"})
            }

            let token = jwt.sign({ "userId": checkUser._id},"Secrete-key");
            if (!token) return res.status(400).send({ success: false, message: "token is not generated" });
            res.cookie("authorization", token);

            return res.status(200).send({success: true,message : "logged in successfully",data : token,checkUser})

        }

    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const getAllUsers = async function(req,res){
    try {

        // if(req.query.disable === "true" || req.query.disable === "false"){
        //     let getAllUser = await userModel.find({disable :req.query.disable})
        //     return res.status(200).send({success : true , message : "successfully fetched all User ",data : getAllUser})
        // }
        let getAllUser = await userModel.find()
        return res.status(200).send({success : true,message : "successfully fetched all the users",data : getAllUser})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const getUserById = async function(req,res){
    try {
        let userId = req.params.userId
        let checkUser = await userModel.findOne({_id : userId})
        if(!checkUser) return res.status(404).send({success : false, message : "user not found for this userId"})
        return res.status(200).send({success : true,message : "successfully fetched user",data : checkUser})
    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
}


const forgetPassword = async function(req,res){
    try {
        let {email,password} = req.body

        const salt = await bcrypt.genSalt(10);

        let checkEmail = await userModel.findOne({email : email})
        if(!checkEmail) return res.status(404).send({success : false, message : "please enter valid email"})

        let hashingPassword = await bcrypt.hash(password, salt);
        
        let updatePassword = await userModel.findOneAndUpdate({_id : checkEmail._id},{$set : {password : hashingPassword}},{new : true})
        return res.status(200).send({success : true,message : "your password is successfully forgeted",data : updatePassword})

    } catch (error) {
        return res.status(500).send({success : false,message : error.message})
    }
} 


const updateUser = async function(req,res){
    try {
        let userId = req.params.userId
        let {firstName,lastName,email,mobile,gender} = req.body
        let getUser = await userModel.findOne({_id : userId})
        if(!getUser) return res.status(404).send({success : false,message : "user not found"})
        
        let image = req.file ? req.file.path : getUser.image

        if(req.file){
            let imagePath = getUser.logo
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
        
        let updateUser = await userModel.findOneAndUpdate({_id : userId},{$set : {firstName,lastName,email,mobile,gender,image : image}},{new : true})
        return res.status(200).send({success : true,message : "successfully updated your profile",data : updateUser})
    } catch (error) {
        return res.status(500).send({success : false ,message : error.message })
    }
}

module.exports = {createUser,signInWithEmailAndMobile,forgetPassword,getUserById,getAllUsers,updateUser}