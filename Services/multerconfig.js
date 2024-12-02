const multer=require("multer")    // This imports the Multer library (used for file uploads).
const Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
module.exports={multer,Storage}