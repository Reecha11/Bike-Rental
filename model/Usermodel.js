const mongoose=require ("mongoose")
const Schema =mongoose.Schema
const userSchema =new Schema({
    username:{
        type:String,
        required:true      //compulsory halnai paro
    },
    email:{
        type:String,
        required:true ,
        unique:true 
    },
    password:{
        type:String,
        required:true  
    },
    otp:{
        type:Number
    },
    role:{
        type:String,
        enum: ['admin','provider','customer'],
        default:'customer'
    }
})
const User = mongoose.model("User",userSchema)   //table banako user vanney ani column (userSchema) sanga connect garako
module.exports=User