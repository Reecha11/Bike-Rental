const Bike = require("../../../model/bikemodel")

exports,addbike=async(req,res)=>{
    const{name,brand,description,category,price}=req.body
   if(!name||!brand||!category||!price){
        return res.status(400).json({
            message:"please provide name ,brand,price,category,description"
        })
    }
        await Bike.create({
            name,
            brand,
            description,
            category,
            price
        })
        res.Status(200).json({
            message:"bike rented sucessfully"
        })
    
}