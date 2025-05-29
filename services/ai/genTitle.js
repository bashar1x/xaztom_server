import { GoogleGenAI } from '@google/genai';
import filterHistory from '../filterHistory.js';
import History from '../../models/History.js';
import dotenv from "dotenv";
dotenv.config();

export default async function genTitle(historyId) {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI });
        const history = await History.findById(historyId)
        const filteredContent = filterHistory(history.messages);
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            config: {
                responseMimeType: 'text/plain',
                systemInstruction: "You are a chat title generator. Generate a short and concise chat title (no more than 5 words) based on the user's message. The title should be in the same language as the user's input.",
            },
            contents: filteredContent
        });
    
        const output = response.text
        console.log('Generated Title:', output);
        history.title = output;
        history.save()
    } catch (error) {
        console.error('genTitle error:', error)
    }
}
