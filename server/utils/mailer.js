// server/utils/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail
    pass: process.env.EMAIL_PASS      // App Password
  }
});

export const sendOTP = async (to, otp) => {
  const mailOptions = {
    from: `"Notes App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP for Notes App',
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
  };
  return transporter.sendMail(mailOptions);
};
