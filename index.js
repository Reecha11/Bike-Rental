
const mongoose =require("mongoose")

const connectToDb =async()=>{
 await mongoose.connect(process.env.DB_URL)
 console.log("Database connceted")
}
module.exports = connectToDb