const User = require("../../../model/Usermodel")
const bcrypt=require("bcryptjs")
const adminSeeder=async()=>{
    const data=await User.find({email:process.env.adminemail})
    if(data.length===0){
        await User.create({
   
            email:process.env.adminemail,
            username:process.env.adminusername,
            password:bcrypt.hashSync(process.env.adminpassword),
            role:"admin"
        })
        console.log("admin seeded sucessfully")
    }
    else{
        console.log("admin already seeded ,no need to seed/insert again")
    }

}

module.exports= adminSeeder

