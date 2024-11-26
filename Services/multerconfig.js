const multer=require("multer")
const Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
module.exports={multer,Storage}