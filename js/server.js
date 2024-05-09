const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  let { name, email, subject, message } = req.body;

  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // Client ID
    process.env.CLIENT_SECRET, // Client Secret
    process.env.REDIRECT_URL // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = oauth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
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
