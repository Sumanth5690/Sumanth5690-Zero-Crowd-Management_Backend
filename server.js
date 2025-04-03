const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(cors());
app.use(express.json());

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

app.get('/home', (req, res) => {
    res.send('Welcome to the OTP service!');
})



app.get('/api/jokes', (req, res) => {
    const jokes = [
       {
        id:1,
        title: "Why don't scientists trust atoms? Because they make up everything!",
        content: "Atoms are the building blocks of matter, and they are everywhere!"
       },
         {
          id:2,
          title: "Why did the scarecrow win an award? Because he was outstanding in his field!",
          content: "Scarecrows are often used in agriculture to deter birds from crops."
         },
         {
          id:3,
          title: "Why don't skeletons fight each other? They don't have the guts!",
          content: "Skeletons are often used in Halloween decorations and medical education."
         },
         {
          id:4,
          title: "What do you call fake spaghetti? An impasta!",
          content: "Pasta is a staple food in many cultures, but this one is just a pun!"
         },
         {
          id:5,
          title: "Why did the bicycle fall over? Because it was two-tired!",
          content: "Bicycles are a popular mode of transportation and exercise."
         }
    ];
   res.send(jokes)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})