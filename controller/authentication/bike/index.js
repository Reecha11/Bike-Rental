const Bike = require("../../../model/bikemodel")

exports.addbike=async(req,res)=>{
    const{name,brand,description,category,price}=req.body     //req.body contains data sent by the client in the request.
   let filename;
   if(!req.file){
    filename="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgIoUwTqj-Xs46Yabml_W4V40Hjj13NASCDQ&s"
   }else{
    filename=req.file.filename
   }

    if(!name||!brand||!category||!price){      //This checks if the required fields (name, brand, category, price) are provided.
        return res.status(400).json({
            message:"please provide name ,brand,price,category,description"
        })
    }

    //Saving the Bike Record to the Database
        await Bike.create({    //Bike.create() method is used to create a new bike record in the database.
            name,               // fields name, brand, description, category, and price are passed to create()
            brand,
            description,
            category,
            price,
            image:filename
        })
        res.status(200).json({
            message:"bike rented sucessfully"
        })
    
}

exports.getBikes=async(req,res)=>{
    const id=req.params.id
    const data=await Bike.find()
    res.status(200).json({
        message:"Bike fetched sucessfully",
        data
    })
}



exports.getBike=async(req,res)=>{
    const id=req.params.id
    const data=await Bike.findById(id)
    res.status(200).json({
        message:"Bike fetched sucessfully",
        data:data
    })
}


exports.deleteBike=async(req,res)=>{
    const id=req.params.id
    const data=await Bike.findByIdAndDelete(id)
    res.status(200).json({
        message:"Bike deleted sucessfully"
    })
}

exports.updateBike=async(req,res)=>{
    const id=req.params.id
    const {name, description,brand,price,category}=req.body
    const data=await Bike.findByIdAndUpdate(id,{
        name,
        brand,
        description,
        price,
        category
    })
    res.status(200).json({
        message:"Bike update sucessfully"
    })
}