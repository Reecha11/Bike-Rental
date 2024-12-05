const express=require("express")

const { getAllUser, deleteUser, getAllProviderlist } = require("../controller/admin/adminController")
const checkisLoginorNot = require("../middleware/checkisLoginorNot")
const accessTo = require("../middleware/accessTo")

const router=express.Router()


router.route("/providers").get(checkisLoginorNot,accessTo("admin"),getAllProviderlist)
// router.get("/providers",checkisLoginorNot)
router.route("/get-user").get(getAllUser)
router.route("/delete-user/:id").get(deleteUser)
module.exports=router