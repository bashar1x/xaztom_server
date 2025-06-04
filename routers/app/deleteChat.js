import express, { Router } from "express";
import dotenv from 'dotenv';
import History from "../../models/History.js";
dotenv.config();


const deleteChat = Router();

deleteChat.delete('/delete-chat/:historyId', async (req, res) => {
    console.log('/delete-chat/:historyId', req.params);
    try {
        const { historyId } = req.params;
        if (!historyId) {
            return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
        };

        const history = await History.findByIdAndDelete(historyId);

        if (!history) {
            return res.status(404).json({ message: "history not found", type: 'HNF' });
        };

        res.status(200).json({ message: "dlelte successfully", type: 'DS' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
        console.error(error)
    }
});

export default deleteChat;