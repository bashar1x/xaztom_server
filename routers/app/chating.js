import express, { Router } from 'express';
import dotenv from 'dotenv';
import GenAi from '../../services/ai/gen.ai.js';
import setGetHistory from '../../services/ai/setGetHistory.js';
import filterHistory from '../../services/filterHistory.js';
import processParts from '../../services/processParts.js';
import genTitle from '../../services/ai/genTitle.js';
// import fs from 'fs'
dotenv.config();

const chating = Router();

chating.post('/chating', async (req, res) => {
    console.log('/chating', req.body);
    let chatInfo;
    try {
        const { content, tools, userInfo, userId, historyId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'Missing required fields.', type: 'MRF' });
        };

        const resultHistory = await setGetHistory(content, userId, historyId);

        if (!resultHistory) {
            return res.status(500).json({ message: 'Error retrieving history.', type: 'ERH' });
        };

        chatInfo = {historyId: resultHistory._id}

        const filteredContent = filterHistory(resultHistory.messages);

        if (!filteredContent) {
            return res.status(500).json({ message: 'Error filtering content.', type: 'EFC' });
        }
       
        const result = await GenAi(filteredContent, tools, userInfo);

        if (!result) {
            return res.status(500).json({ message: 'Error generating content.', type: 'EGC' });
        };
        // console.log('result:', result);

        const processedParts = await processParts(result.content.parts, result.serching);

        if (!processedParts) {
            return res.status(500).json({ message: 'Error processed content.', type: 'EPC' });
        }
        // console.log('processedParts:', processedParts);
    
        setGetHistory(processedParts, userId, historyId || resultHistory._id);

        if (resultHistory.title == 'new chat') genTitle(resultHistory._id);

        res.json({
            message: 'generative successful',
            type: 'GS',
            content: processedParts,
            chatInfo
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal server error.', type: 'ISE',
            chatInfo
        });
    }
});

export default chating;




// function ss(dataToSave) {
//     fs.writeFile('./result.json', JSON.stringify(dataToSave, null, 2), (err) => {
//         if (err) {
//             return console.error('Error writing to file:', err);
//         }
//         console.log('Content saved to result.json');
//     });
// }