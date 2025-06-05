import express, { json, urlencoded, static as static_ } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./connect.db.js";
import verifyApp from "./middlewares/verifyApp.js";

import paths from './routers/paths/paths.js';

import signIn from './routers/logs/signIn.js';
import signUp from './routers/logs/signUp.js';
import verify from './routers/logs/verify.js';
import reCode from './routers/logs/reCode.js';
import rePassword from "./routers/logs/rePassword.js";


import chating from "./routers/app/chating.js";
import uploadMidea from "./routers/app/updateMidea.js";
import images from "./routers/app/Images.js";
import getChats from "./routers/app/getChats.js";
import editChatTitle from "./routers/app/editChatTitle.js"
import deleteChat from "./routers/app/deleteChat.js";
const app = express();
// Middlewares
// app.use(json()); app.use(urlencoded()); 
app.use(static_('views'));
app.use(cors());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));

dotenv.config();
connectDB();

app.use('/api/logs', verifyApp, signIn);
app.use('/api/logs', verifyApp, signUp);
app.use('/api/logs', verifyApp, verify);
app.use('/api/logs', verifyApp, reCode);
app.use('/api/logs', verifyApp, rePassword);

app.use('/api/app', images);
app.use('/api/app', verifyApp, chating);
app.use('/api/app', verifyApp, uploadMidea);
app.use('/api/app', verifyApp, getChats);
app.use('/api/app', verifyApp, editChatTitle);
app.use('/api/app', verifyApp, deleteChat);

app.use('/bages', paths);
app.listen(process.env.PORT || 3000, () => console.log('Server is running on http://localhost:3000'));

// PING BOT ----
app.get('/run', (req, res) => { res.json({ run: 'Server is running v1' }) })
setInterval(() => {
        fetch('https://zin-ai.onrender.com/run');
}, 100 * 1000)