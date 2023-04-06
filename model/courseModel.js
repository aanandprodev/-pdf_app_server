const mongoose = require("mongoose")
const homeSchema = new mongoose.Schema({
    logo : String,
    description : String,
    disable : {
        type : String,
        default :false
    }
},{timestamps : true})

module.exports = mongoose.model("homeModel",homeSchema)