import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI });

export default async function uploadFile(base64Image, mimeType) {
    console.log('uploadFile started');
    try {
        const buffer = Buffer.from(base64Image, 'base64');
        const blob = new Blob([buffer], { type: mimeType })
        return await ai.files.upload({
            file: blob,
            config: {
                mimeType
            }
        });
        // return {uri: 'https://gooo', mimeType: 'image/png'};
    } catch (error) {
        console.error("Error uploading media:", error);
        throw error;
    }
};