const User=require("../../model/Usermodel")
const bcrypt=require("bcryptjs")

exports.registeruser=async(req,res)=>{
    const{username,email,password}=req.body
    if (!username|| !email || !password){
      res.status(400).json({
          message:"please provide username,email,passsword"
      })
      return
    }
   await User.create({
      username,
      email,
      password: bcrypt.hashSync(password,12)
   })
   res.status(201).json({
   message:"user register successfully"
  })
  }

  exports.loginUser=async(req,res)=>{
    const{email,password}=req.body
    if(!email||!password){
        res.status(400).json({
            message:"please provide email and password"
        })
        return
    }
    //check email
    const data=await User.find({email:email})
    console.log(data)
  }