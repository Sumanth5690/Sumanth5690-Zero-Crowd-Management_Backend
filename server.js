const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const twilio = require('twilio');
const bodyParser = require('body-parser');



const PORT=process.env.PORT || 3000;


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {};

app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

    otpStore[phoneNumber] = otp; // Store OTP in memory (for demo purposes)

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})