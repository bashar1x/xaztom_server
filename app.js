import express, { json, urlencoded, static as static_ } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./connect.db.js";
import signIn from './routers/logs/signIn.js';
import signUp from './routers/logs/signUp.js';
import verify from './routers/logs/verify.js';
import reCode from './routers/logs/reCode.js';
import rePassword from "./routers/logs/rePassword.js";
import verifyApp from "./middlewares/verifyApp.js";

import chating from "./routers/app/chating.js";
import uploadMidea from "./routers/app/updateMidea.js";
import images from "./routers/app/Images.js";
const app = express();
// Middlewares
app.use(json()); app.use(urlencoded()); app.use(static_('views'));
app.use(cors());
dotenv.config();
connectDB();

app.use('/api/logs', verifyApp, signIn);
app.use('/api/logs', verifyApp, signUp);
app.use('/api/logs', verifyApp, verify);
app.use('/api/logs', verifyApp, reCode);
app.use('/api/logs', verifyApp, rePassword);

app.use('/api/app', chating);
app.use('/api/app', uploadMidea);
app.use('/api/app', images)
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});

// Test GenAi
// import GenAi from "./services/ai/gen.ai.js";
//  GenAi()
