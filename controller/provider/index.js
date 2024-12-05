const provider = require("../../model/providermodel")     //The providermodel module is imported from the specified path

exports.becomeprovider=async(req,res)=>{
    const{name,ContactNo,email,vatNo,panNo,location}=req.body   
    const customerId=req.user.id
    if(!name||!ContactNo||!email||!location){
        return res.status(400).json
({
    message:"please provide name,ContactNo,email,location"

})  

}
await provider.create({             //A new provider record is created using the provider.create 
    name,
    ContactNo,
    email,
    location,
    vatNo,
    panNo,
    customerId:customerId
})
res.status(200).json({
    message:"Your form has been submitted"
})
}


exports.changeproviderStatus=async(req,res)=>{
    const {status,providerId}=req.body
    const data=await provider.findById(providerId)
    if(status="active"){
       await provider.findByIdAndUpdate(providerId,{status:"active"})
       await user.findByIdAndUpdate(data.customerId,{role:"provider"})
        //code for changing user role
        res.status(200).json({
            mwssage:"provider is active now"
        })
    }
    else if(status="inactive"){
       await provider.findByIdAndUpdate(providerId,{status:"inactive"})
        res.status(200).json({
            mwssage:"provider is inactive now"
        })
    }else{
        res.status(200).json({
            mwssage:"invalid status"
        })
    }
    
}
