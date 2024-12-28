const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = (email, token) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<h2>Please click on the link below to verify your email</h2>
             <a href="http://localhost:${process.env.PORT}/api/verify-email?token=${token}">Verify Email</a>
             <p>This link is valid for 5 minutes.</p>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
};

module.exports = sendVerificationEmail;