const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  let { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
