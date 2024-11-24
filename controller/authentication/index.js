const User=require("../../model/Usermodel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const sendMail = require("./Services/sendMail")

exports.registeruser=async(req,res)=>{
    try{
      const{username,email,password}=req.body   //req.body contains the data sent by the client 

      // Step 1: Check if all required fields are provided
    if (!username|| !email || !password){
      res.status(400).json({
          message:"please provide username,email,passsword"
      })
      return
    }

     // Step 2: Create a new user in the database
   await User.create({
      username,
      email,
      password: bcrypt.hashSync(password,12)   //Step 3: Hash the password
   })

   // Step 4: Send a success response
   res.status(201).json({
   message:"user register successfully"
  })
  }

  // Step 5: Handle any errors that occur
catch(error){
  res.status(500).json({
    message:"Error",
    errMessage:error.message
  })
}

    }
  exports.loginUser=async(req,res)=>{
   try{
    const{email,password}=req.body
    if(!email||!password){
        res.status(400).json({
            message:"please provide email and password"
        })
        return
    }
    //check email
    const data=await User.find({email:email})   //find return array
 
    if (data.length===0){
      res.status(404).json({
        message:"No user with that email"
      })
    }else{
      //password check
      const isPasswordMatched=bcrypt.compareSync(password,data[0].password)  //return boolean
      if(isPasswordMatched){
       var token= jwt.sign({id:data[0]._id},process.env.JWT_SECRET_KEY,{
          expiresIn:process.env.JWT_EXPIRE_IN
        })
        res.status(200).json({
          message:"logged in sucessfully",
          token
        })
      }else{
        res.status(400).json({
          message:"invalid password"
        })
      }
    }
  }
   catch(error){
    res.status(500).json({
      message:"Error",
      errMessage:error.message
    })
   }
  }

  exports.loginUser=async(req,res)=>{

  }
  exports.forgetPassword =async(req,res)=>{
    const{email}=req.body
    if(!email){
      res.status(400).json({
        message:"provude email"
      })
      return
    }
    var otp =1234
     await sendMail(email,otp)
    res.status(200).json({
message:"OTP sent sucessfully"
    })
  }

  