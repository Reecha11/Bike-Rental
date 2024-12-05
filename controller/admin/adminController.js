
const User = require("../../model/Usermodel")

exports.getAllUser=async(req,res)=>{
    const data=await User.find()
    res.status(200).json({
        message:"User fetched sucessfully",
        data:data
    })
}
exports.deleteUser=async(req,res)=>{
    const id=req.params.id
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message:"User deleted sucessfully",
        
    })

}
exports.getAllProviderlist =async (req,res)=>{
    const data=await provider.find()
    res.status(202).json({
        message:"provider fetched sucessfully",
        data
    })
}