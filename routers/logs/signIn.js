import express, { Router } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import { Compare } from '../../services/hashing.js';
import SenderVerifyCode from '../../services/sendVerifyCode.js';
import GenerateCode from '../../services/generateCode.js';

dotenv.config();

const signIn = Router();

signIn.post('/sign-in', async (req, res) => {
  console.log('/sign-in', req.body);
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.', type: 'AFR' }); // 400: Bad Request
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.', type: 'IEP' }); // 401: Unauthorized
    };

    const isPasswordValid = await Compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.', type: 'IEP' }); // 401: Unauthorized
    };

    if (user.isBanned) {
      return res.status(403).json({ message: 'This account is banned.', type: 'TAB' }); // 403: Forbidden
    };

    if (!user.isVerify) {
      const generateCode = GenerateCode();
      user.codeVerify = generateCode;
      await user.save();
      SenderVerifyCode(email, generateCode);
      return res.status(403).json({ message: 'Verification is required.', type: 'VR' }); // 403: Forbidden
    };

    res.status(200).json({
      message: 'Login successful.',
      type: 'LS',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerify: user.isVerify
      },
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', type: 'ISE' }); // 500: Internal Server Error
  }
});

export default signIn;
