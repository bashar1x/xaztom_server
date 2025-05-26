import express, { Router } from "express";
import dotenv from 'dotenv';
import History from "../../models/History.js";
dotenv.config();


const getChats = Router();

getChats.get('/get-chats/:userId', async (req, res) => {
    console.log('/get-chats/:userId', req.params);
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
        };

        const history = await History.find({ userId }).sort({ createdAt: -1 });

        if (!history) {
            return res.status(404).json({ message: "history not found", type: 'HNF' });
        };

        res.status(200).json({ message: "find successfully", type: 'FS', history });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
        console.log(error)
    }
});

export default getChats;