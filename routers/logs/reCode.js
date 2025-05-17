import express, { Router } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import GenerateCode from '../../services/generateCode.js';
import SenderVerifyCode from '../../services/sendVerifyCode.js';
dotenv.config();

const reCode = Router();

reCode.post('/re-code', async (req, res) => {
  console.log('/re-code', req.body);
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email.', type: 'IE' });
    }

    const generateCode = GenerateCode();

    user.codeVerify = generateCode;
    await user.save();

    SenderVerifyCode(email, generateCode);

    res.status(200).json({ message: 'Resend code successful.', type: 'RCS' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
  }
});

export default reCode;