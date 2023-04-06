const mongoose = require("mongoose")
const subjectSchema = new mongoose.Schema({
    logo : String,
    subject : String,
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "courseModel"
    },
    language : String,
    disable : {
        type : String,
        default :false
    }
},{timestamps : true})

module.exports = mongoose.model("subjectModel",subjectSchema)