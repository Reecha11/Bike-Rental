const express=require("express")
const { registeruser, loginUser, forgetPassword, resetPassword } = require("../controller/authentication")

const router=express.Router()

router.route("/register").post(registeruser)
router.route("/login").post(loginUser)
router.route("/forget_password").post(forgetPassword)
router.route("/reset_password").post(resetPassword)





module.exports=router