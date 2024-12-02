const provider = require("../../model/providermodel")

exports.becomeprovider=async(req,res)=>{
    const{name,ContactNo,email,vatNo,panNo,location}=req.body
    const customerId=req.user.id
    if(!name||!ContactNo||!email||!location){
        return res.status(400).json
({
    message:"please provide name,ContactNo,email,location"

})  

}
await provider.create({
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
