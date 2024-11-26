require("dotenv").config()
const express=require("express")     //express: Framework for building your server and API
const connectToDb = require(".")     //function that connects to MongoDB  (likely defined in another file).
const bcrypt=require("bcryptjs")     //A package for comparing passwords securely
const User = require("./model/Usermodel")   
const { registeruser, loginUser, forgetPassword, resetPassword, getAllBikes } = require("./controller/authentication")
const { addbike, deleteBike, updateBike, getBike, getBikes } = require("./controller/authentication/bike")
const app=express()
connectToDb()

const{multer,Storage}=require("./Services/multerconfig")
const upload=multer ({storage:Storage})

app.use (express.json())

//register api
app.post("/register",registeruser)
app.post("/login",loginUser)
app.post("/forget",forgetPassword)
app.post("/reset_password",resetPassword)

//bike api
app.post("/addbike",upload.single("image"),addbike)
app.get("/getbikes",getBikes)
app.get("/getbike/:id",getBike)
app.delete("/deletebike/:id",deleteBike)
app.patch("/updatebike/:id",updateBike)

const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started"+port)
})