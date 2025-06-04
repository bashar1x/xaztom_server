import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export default function SenderVerifyCode(to, code) {

const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADRIS,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.SENDER_MAILE,
    to,
    subject: 'Verification Code from Zin',
    text: 'Verify your account...',
    html: `
      <div>
        <h1>Welcome to Zin</h1>
        <p>Thank you for using our app. Your verification code is:</p>
        <code style="color:rgb(59, 124, 221); font-size: 20px;">${code}</code>
        <p>Please enter this code in the app to complete the verification process.</p>
        <p>If you did not request this email, please ignore it.</p>
        <p>If you need assistance, feel free to contact our support team at <a href="https://www.instagram.com/bashar1_x">support Zin ai</a>.</p>
      </div>`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
        console.log('Email send: ' + info.response);
        return true
    }
  });
}
