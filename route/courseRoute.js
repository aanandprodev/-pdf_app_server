const express = require("express"); 
const router = express.Router()
// const multer = require("multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONTROLLERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
const courseController = require("../controllers/courseController")
const {upload} = require("../middleware/multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post("/course/createcourse",upload.single("logo"),courseController.createcourse)
router.get("/course/getAllcourse",courseController.getAllcourse)
router.get("/course/getcourseById/:courseId",courseController.getcourseById)
router.put("/course/updatecourse/:courseId",upload.single("logo"),courseController.updatecourse)
router.delete("/course/deletecourse/:courseId",courseController.deletecourse)

module.exports = router
   



