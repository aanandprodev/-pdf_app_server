const express = require("express"); 
const router = express.Router()
// const multer = require("multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONTROLLERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
const subjectController = require("../controllers/subjectController")
const {upload} = require("../middleware/multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post("/subject/createsubject",upload.single("logo"),subjectController.createsubject)
router.get("/subject/getAllsubjectbycourseId/:courseId",subjectController.getAllsubjectbycourseId)
router.get("/subject/getsubjectById/:subjectId",subjectController.getsubjectById)
router.put("/subject/updatesubject/:subjectId",upload.single("logo"),subjectController.updatesubject)
router.delete("/subject/deletesubject/:courseId",subjectController.deletesubject)


module.exports = router
   



