import express from "express"
const app = express();

import dotenv from "dotenv"
dotenv.config({
    path:'./env'
});
import twilio from "twilio"



const PORT=process.env.PORT 


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {};

app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

    otpStore[phoneNumber] = otp; 

    client.messages
        .create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        })
        .then(message => {
            res.status(200).json({ message: 'OTP sent successfully', sid: message.sid });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to send OTP', details: error });
        });
})


app.get('/home', (req, res) => {
    res.send('Welcome to the OTP service!');
})



app.get("/api/healthcheck",(req,res)=>{
    const jocks = [
        {
            id: "name",
            name:"srujan",
            jokes:"i can eat an elefent",
        },
        {
            id:"srujan",
            name:"monkey",
            jokes:"hello what are you doing monkey",
        }
    ]
    res.send(jocks)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})