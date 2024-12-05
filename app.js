require("dotenv").config()
const express=require("express")     //express: Framework for building your server and API
const connectToDb = require(".")
     //function that connects to MongoDB  (likely defined in another file).
const app=express()
app.use(express.json())
const userRoute=require("./routes/userRoutes")
const adminRouter=require("./routes/adminRoutes")
const providerRouter=require("./routes/providerRoutes")
const bikeRouter=require("./routes/bikeRoutes")
connectToDb()


const adminSeeder = require("./controller/authentication/bike/adminSeeder")



//authentication api
app.use("/user",userRoute)

//bike api
// app.post("bike/addbike",checkisLoginorNot,accessTo("admin"),upload.single("image"),addbike)
// app.get("bike/getbikes",getBikes)
// app.get("bike/getbike/:id",getBike)
// app.delete("bike/deletebike/:id",deleteBike)
// app.patch("bike/updatebike/:id",updateBike)
app.use("/bike",bikeRouter)

//admin api
// app.get("/admin/User",checkisLoginorNot,accessTo("admin"),getAllUser)
// app.delete("/admin/User/:id",checkisLoginorNot,accessTo("admin"),deleteUser)
app.use("/admin",adminRouter)
//provider api
// app.post("/provider/become",checkisLoginorNot,accessTo("customer"),becomeprovider)
// app.patch("/provider/change-status",checkisLoginorNot, accessTo("admin",changeproviderStatus))
app.use("/provider",providerRouter)

const port=process.env.port
app.listen(port,()=>{
    adminSeeder()
    console.log("server backend has started"+port)
})