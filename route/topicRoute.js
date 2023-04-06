const express = require("express"); 
const router = express.Router()
// const multer = require("multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CONTROLLERS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
const topicController = require("../controllers/topicController")
const {upload} = require("../middleware/multer")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< USER ROUTES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//

router.post("/topic/createtopic",upload.fields([{name : "logo"},{name : "pdfFile"}]),topicController.createtopic)
router.get("/topic/getAlltopicbySubjectId/:subjectId",topicController.getAlltopicbySubjectId)
router.get("/topic/gettopicById/:topicId",topicController.gettopicById)
router.put("/topic/updatetopic/:topicId",upload.fields([{name : "logo"},{name : "pdfFile"}]),topicController.updatetopic)
router.put("/topic/deletetopic/:topicId",topicController.deletetopic)

module.exports = router
   



