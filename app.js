require("dotenv").config()
const express=require("express")
const connectToDb = require(".")
const bcrypt=require("bcryptjs")
const User = require("./model/Usermodel")
const { registeruser, loginUser } = require("./controller/authentication")
const app=express()
connectToDb()

app.use (express.json())

//register api
app.post("/register",registeruser)
app.post("/login",loginUser)

const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started"+port)
})