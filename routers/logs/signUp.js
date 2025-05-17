import express, { Router } from 'express';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import { Hash } from '../../services/hashing.js';
import SenderVerifyCode from '../../services/sendVerifyCode.js';
import GenerateCode from '../../services/generateCode.js';

dotenv.config();

const signUp = Router();

signUp.post('/sign-up', async (req, res) => {
  console.log('/sign-up', req.body);
  try {

    const { name, email, password, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
    };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.', type: 'EAR' });
    };


    const hashedPassword = await Hash(password);
    const generateCode = GenerateCode();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      codeVerify: generateCode,
    });

    await newUser.save();

    SenderVerifyCode(email, generateCode);

    res.status(200).json({
      message: 'User registered successfully.',
      type: 'URS',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerify: newUser.isVerify
      },
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
  }
});

export default signUp;