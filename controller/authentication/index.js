const User=require("../../model/Usermodel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const sendMail = require("../../Services/sendMail")
const generateOtp = require("../../Services/genereteOtp")

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


  exports.forgetPassword =async(req,res)=>{

try{

  // Step 1: Extract the email from the request body
  const{email}=req.body

  // Step 2: Query the database to find a user with the provided email
  let data= await User.find ({email:email})

  // Step 3: Check if no user exists with the given email
  if (data.length===0){
    return res.status(404).json({
      message:"no user registered with that email"
    })
  }

  // Step 4: Check if the email was not provided in the request
  if(!email){
    res.status(400).json({
      message:"provide email"
    })
    return   // Exit the function 
  }

  // Step 5: Generate a one-time password (OTP)
  var otp =generateOtp()
  data[0].otp=otp         // Assign the OTP to the user's `otp` field
  await data[0].save()    // Save the updated record to the database

  // Step 7: Send the OTP to the user's email
   await sendMail(email,otp)    // Send the OTP via the `sendMail` function

   // Step 8: Send a success response to the client
  res.status(200).json({
message:"OTP sent sucessfully"
  })
}

 // Step 9: Handle unexpected errors
catch(error){
  res.status(500).json({
    message:"Error",
    errMessage:error.message     // Include the actual error message 
  })
 }
  }

  exports.resetPassword=async(req,res)=>{
   try{
    const{otp,newPassword}=req.body
    if(!otp||!newPassword){
      res.status(400).json({
        message:"please provide otp,newPassword"
      })
    }
  
  //otp verify whether yo otp xa ki xaina
  const [data]=await User.find({otp:otp})  // destructing data pailaarray thyo aila object
  if(!data){
    return res.status(404).json({
      message:"invalid otp"
    })
  }
  data.password=bcrypt.hashSync(newPassword,10)
  await data.save()
  res.status(200).json
({
  message:"password reset sucessfullyr"
})
   }
catch(error){
  res.status(500).json({
    message:"Error",
    errMessage:error.message
  })
 }

   
  }

  