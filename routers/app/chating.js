import express, { Router } from 'express';
import dotenv from 'dotenv';
import GenAi from '../../services/ai/gen.ai.js';
import setGetHistory from '../../services/ai/setGetHistory.js';
import filterHistory from '../../services/filterHistory.js';
import processParts from '../../services/processParts.js';
import genTitle from '../../services/ai/genTitle.js';

dotenv.config();

const chating = Router();

chating.post('/chating', async (req, res) => {
    console.log('/chating', req.body);
    let chatInfo;

    try {
        const { content, tools, userInfo, userId, historyId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'Missing required fields.', type: 'MRF' });
        }

        const resultHistory = await setGetHistory(content, userId, historyId);
        if (!resultHistory) {
            return res.status(500).json({ message: 'Error retrieving history.', type: 'ERH' });
        }

        chatInfo = { historyId: resultHistory._id };

        const filteredContent = filterHistory(resultHistory.messages);
        if (!filteredContent) {
            return res.status(500).json({ message: 'Error filtering content.', type: 'EFC' });
        }

        const result = await GenAi(filteredContent, tools, userInfo);
        if (!result) {
            return res.status(500).json({ message: 'Error generating content.', type: 'EGC' });
        }

        const processedParts = await processParts(result.content.parts, result.serching);
        if (!processedParts) {
            return res.status(500).json({ message: 'Error processing content.', type: 'EPC' });
        }

        // ✅ الرد أولًا
        console.log("✅ Sending response to client");
        res.status(200).json({
            message: 'generative successful',
            type: 'GS',
            content: processedParts,
            chatInfo
        });

        // ✅ ثم عمليات الخلفية بشكل آمن
        setGetHistory(processedParts, userId, historyId || resultHistory._id)
            .catch(err => console.error('setGetHistory error:', err));

        if (resultHistory.title === 'new chat') {
            genTitle(resultHistory._id)
                .catch(err => console.error('genTitle error:', err));
        }

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            message: 'Internal server error.',
            type: 'ISE',
            chatInfo
        });
    }
});

export default chating;