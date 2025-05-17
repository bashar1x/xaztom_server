import express, { Router } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import { Hash } from '../../services/hashing.js';

dotenv.config();

const rePassword = Router();

rePassword.put('/re-password', async (req, res) => {
  console.log('/re-password',req.body);
  try {

    const { email, password, code } = req.body;

    if (!email || !password || !code) {
      return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email.', type: 'IE' });
    };

    if (user.codeVerify !== Number(code)) {
      return res.status(400).json({ message: 'error code.', type: 'EC' });
    };

    const hashedPassword = await Hash(password);
    user.codeVerify = null;
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Reset password successfully.', type: 'RPS' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
  }
});

export default rePassword;