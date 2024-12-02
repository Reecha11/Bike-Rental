require("dotenv").config()
const express=require("express")     //express: Framework for building your server and API
const connectToDb = require(".")
     //function that connects to MongoDB  (likely defined in another file).
const bcrypt=require("bcryptjs")     //A package for comparing passwords securely
const User = require("./model/Usermodel")   
const { registeruser, loginUser, forgetPassword, resetPassword, getAllBikes } = require("./controller/authentication")
const { addbike, deleteBike, updateBike, getBike, getBikes } = require("./controller/authentication/bike")
const app=express()
app.use(express.json())
connectToDb()

const{multer,Storage}=require("./Services/multerconfig")
const adminSeeder = require("./controller/authentication/bike/adminSeeder")
const checkisLoginorNot = require("./middleware/checkisLoginorNot")
const accessTo = require("./middleware/accessTo")
const { getAllUser, deleteUser } = require("./controller/admin/adminController")
const { becomeprovider } = require("./controller/provider")
const upload=multer ({storage:Storage})


//register api
app.post("/register",registeruser)
app.post("/login",loginUser)
app.post("/forget",forgetPassword)
app.post("/reset_password",resetPassword)

//bike api
app.post("/addbike",checkisLoginorNot,accessTo("admin"),upload.single("image"),addbike)
app.get("/getbikes",getBikes)
app.get("/getbike/:id",getBike)
app.delete("/deletebike/:id",deleteBike)
app.patch("/updatebike/:id",updateBike)

//admin api
app.get("/admin/User",checkisLoginorNot,accessTo("admin"),getAllUser)
app.delete("/admin/User/:id",checkisLoginorNot,accessTo("admin"),deleteUser)


//provider api
app.post("/provider/become",checkisLoginorNot,accessTo("customer"),becomeprovider)


const port=process.env.port
app.listen(port,()=>{
    adminSeeder()
    console.log("server backend has started"+port)
})