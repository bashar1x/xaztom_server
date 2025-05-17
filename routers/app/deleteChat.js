import express, { Router } from "express";
import dotenv from 'dotenv';
import Invoice from "../../models/Invoicee.js";
dotenv.config();

const app_deleteInvoice = Router();

app_deleteInvoice.delete('/app_delete-invoice/:userId/:idInvoice', async (req, res) => {
    try {
        const { userId, idInvoice } = req.params;
        console.log(userId, idInvoice);

        if (!userId || !idInvoice) {
            return res.status(404).json({ message: "Id is required", type: 'IIR' });
        }

        const invoice = await Invoice.findOneAndDelete({ _id: idInvoice, userId });
        
        if (!invoice) {
            return res.status(404).json({ message: "User not found", type: 'UNF' });
        }

        return res.status(200).json({ message: 'Deleted successfully', type: 'DS' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
        console.error(error);
    }
});

export default app_deleteInvoice;
