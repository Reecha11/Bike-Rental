const jwt=require("jsonwebtoken")
const User = require("../model/Usermodel")
const checkisLoginorNot=(req,res,next)=>{

    const token=req.headers.authorization
    console.log(token)
    if(!token){
        return res.status(403).json({
            message:"please provide token"
        })
    }
        jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,result)=>{
            if(err){
                res.status.json({
                    message:err
                })
            }else{
                console.log(result)
                //check whether result ko id ko user xa ki nai
                const data=await User.findById(result.id)
                if(!data){
                    return res.status(403).json({
                        message:"No user wiith that id"
                    })

                }else{
                    req.user=data
                    
                    next()
                }
            }
        })
    
}
module.exports=checkisLoginorNot