const mongoose=require("mongoose")
const Schema= mongoose.Schema
const bikeSchema=new Schema({
    name:{
        type:String,
        required:[true,"Bike name must be provided"]
    },
    price:{
        type:Number,
        required:[true,"Bike price must be provided"]
    },
    brand:{
        type:String,
        required:[true,"Bike brand must be provided"]
    },
    description:{
        type:String,
        required:[true,"Bike description must be provided"]
    },
    image:String,
    category:{
        type:String,
        enum:["Bike","Scooter"],
        default:"Bike"
    }
})
const Bike=mongoose.model("Bike",bikeSchema)
module.exports=Bike