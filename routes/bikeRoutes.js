const express=require("express")


const router=express.Router()

const{multer,Storage}=require("./../Services/multerconfig")
const { addbike, getBikes, getBike, deleteBike, updateBike } = require("../controller/authentication/bike")
const checkisLoginorNot = require("../middleware/checkisLoginorNot")
const accessTo = require("../middleware/accessTo")
const upload=multer ({storage:Storage})


router.route("/add-bike").post(checkisLoginorNot,accessTo("admin"),upload.single("image"),addbike)
router.route("/get-bikes").get(getBikes)
router.route("/get-bike").get(getBike)
router.route("/delete-bike").delete(deleteBike)
router.route("/update-bike").patch(updateBike)

module.exports=router