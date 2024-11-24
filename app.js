require("dotenv").config()
const express=require("express")     //express: Framework for building your server and API
const connectToDb = require(".")     //function that connects to MongoDB  (likely defined in another file).
const bcrypt=require("bcryptjs")     //A package for comparing passwords securely
const User = require("./model/Usermodel")   
const { registeruser, loginUser, forgetPassword } = require("./controller/authentication")
const app=express()
connectToDb()

app.use (express.json())

//register api
app.post("/register",registeruser)
app.post("/login",loginUser)
app.post("/forget",forgetPassword)

const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started"+port)
})