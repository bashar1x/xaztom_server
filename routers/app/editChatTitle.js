import express, { Router } from "express";
import dotenv from 'dotenv';
import History from "../../models/History.js";
dotenv.config();


const editChatTitle = Router();

editChatTitle.put('/edit-chat-title/:historyId', async (req, res) => {
    console.log('/edit-chat-title/:historyId', req.params, req.body);
    try {
        const { historyId } = req.params;
        const { title } = req.body;

        if (!historyId, !title) {
            return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
        };

        const history = await History.findByIdAndUpdate(historyId, { $set: { title } });

        if (!history) {
            return res.status(404).json({ message: "history not found", type: 'HNF' });
        };

        res.status(200).json({ message: "edit successfully", type: 'ES', history });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
        console.error(error)
    }
});

export default editChatTitle;