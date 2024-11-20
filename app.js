require("dotenv").config()
const express=require("express")
const connectToDb = require(".")
const app=express()
connectToDb()

const port=process.env.port
app.listen(port,()=>{
    console.log("server backend has started"+port)
})