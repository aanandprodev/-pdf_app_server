const express = require('express')
const {default : mongoose} = require('mongoose')
const cors = require("cors")
const app = express()
require("dotenv").config()


const courseRoute = require("./route/courseRoute")
const subjectRoute = require("./route/subjectRoute")
const topicRoute = require("./route/topicRoute") 
const userRoute = require("./route/userRoute") 


app.use(cors())

app.use(express.json())
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://anandpro:12341234@cluster0.vjqrv3b.mongodb.net/app-arry")

.then(() => console.log("mongoDb is connected"))
.catch((error) => error.message)

app.use("/uploads",express.static('uploads'))
// app.use("/",express.static(__dirname, + '/invoice'))

app.use("/api/v1",courseRoute)
app.use("/api/v1",subjectRoute)
app.use("/api/v1",topicRoute)
app.use("/api/v1",userRoute)


app.use('/',((res,req)=>req.json('hello world')))

app.listen(4000,function(){
    console.log("server running on port "+ (4000))
})



