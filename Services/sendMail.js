const nodemailer= require ("nodemailer")     //Nodemailer is a package for sending emails

async function sendMail(email,otp){
    console.log(process.env.EMAIL)
    console.log(process.env.PASSWORD)
    //first configure nodemailer with our configuration
  const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD    //not password,its app password
    },
    secure:false
  })

  //sending the email
  await transporter.sendMail({
    to:email,
    subject:"regarding forget password",
    text:"hello,your request otp is "+otp
  })
}
module.exports=sendMail