const mongoose=require("mongoose")
const Schema=mongoose.Schema
const providerSchema=new Schema({
    name:{
        type:String,
        require:[true,"Name must be provided"]
    },
    ContactNo:{
        type:String,
        require:[true,"contact number must be provided"],
        minlength:10,
        maxlength:10
    },
    email:{
        type:String,
        require:true
    },
    vatNo:{
        type:String,
        
    },
    panNo:{
        type:String,
    },
    location:{
        type:String,
        require:[true,"location must be provided"]
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:[
            'active','inactive','pending'
        ],
        default:'pending'
    }
})
const provider=mongoose.model("provider",providerSchema)
module.exports=provider