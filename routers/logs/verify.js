import express, { Router } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

const verify = Router();

verify.post('/verify', async (req, res) => {
  console.log('/verify', req.body);
  try {

    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
    };

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email.', type: 'IE' });
    };

    if (user.codeVerify !== Number(code)) {
      return res.status(400).json({ message: 'error code.', type: 'EC' });
    };


    user.isVerify = true;
    user.codeVerify = null;
    await user.save();

    res.status(200).json({
      message: 'Verify successful.',
      type: 'VS',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerify: user.isVerify
      },
    });


  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
  }
});

export default verify;