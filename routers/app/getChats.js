import express, { Router } from "express";
import dotenv from 'dotenv';
import Menu from "../../models/Menu.js";
dotenv.config();


const app_getMenus = Router();

app_getMenus.get('/app_get-menus/:shopId', async (req, res) => {
    console.log(req.params);
    try {
        const { shopId } = req.params;

        if (!shopId) {
            return res.status(400).json({ message: 'All fields are required.', type: 'AFR' });
        };
        
        const menu = await Menu.find({ shopId }).sort({ createdAt: -1 }); 

        if (!menu) {
           return res.status(404).json({ message: "menu not found", type: 'MNF' });
        };

        res.status(200).json({ message: "find successfully", type: 'FS', menu });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', type: 'ISE' });
        console.log(error)
    }
});

export default app_getMenus;