const express=require("express")

const { becomeprovider, changeproviderStatus } = require("../controller/provider")
const checkisLoginorNot = require("../middleware/checkisLoginorNot")
const accessTo = require("../middleware/accessTo")


const router=express.Router()



router.route("/become").post(checkisLoginorNot,accessTo("customer"),becomeprovider)
router.route("/change-status").patch(checkisLoginorNot,accessTo("admin"),changeproviderStatus)

module.exports=router