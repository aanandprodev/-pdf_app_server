const express = require("express");
const router = express.Router()
const multer = require("multer")
const {upload} = require("../middleware/multer")

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONTROLLERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

const userController = require("../controllers/userController")

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//


router.post("/user/createUser",upload.single("image"),userController.createUser)
router.post("/user/signInWithEmailAndMobile",userController.signInWithEmailAndMobile)
router.get("/user/getUserById/:userId",userController.getUserById)
router.get("/user/getallusers",userController.getAllUsers)
router.put("/user/forgetPassword",userController.forgetPassword)
router.put("/user/updateUser/:userId",upload.single("image"),userController.updateUser)

module.exports = router
   



