const mongoose = require("mongoose")
const topicSchema = new mongoose.Schema({
    logo : String,
    topicName : String,
    subjectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subjectModel"
    },
    pdfFile : String,
    disable : {
        type : String,
        default :false
    }
},{timestamps : true})

module.exports = mongoose.model("topicModel",topicSchema)