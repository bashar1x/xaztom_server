import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs'

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI });

export default async function GenAi(content, tool) {
  console.log(content, '\n\n', tool);
// return false
  try {
    const result = await ai.models.generateContent({
      model: tool.generate
        ? 'gemini-2.0-flash-preview-image-generation'
        : 'gemini-2.5-flash-preview-05-20',

      contents: content,

      config: {
        ...(tool.generate && { responseModalities: ['TEXT', 'IMAGE'] }),
        ...(tool.thinking && {
          thinkingConfig: {
            includeThoughts: true,
          },
        }),
        tools: [
          ...(tool.search ? [{ googleSearch: {} }] : []),
          ...(tool.generate ? [] : [ { urlContext: {} }]),
        ],
        // topP: 1,
        // temperature: 1.5,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
    });
    // ss(result)
    return {
      content: result?.candidates?.[0]?.content,
      serching: result?.candidates?.[0]?.groundingMetadata?.groundingChunks
    }

  } catch (error) {
    console.error("Error in GenAi:", error);
    throw error;
  }
}


function ss(dataToSave) {
  fs.writeFile('./result.json', JSON.stringify(dataToSave, null, 2), (err) => {
    if (err) {
      return console.error('Error writing to file:', err);
    }
    console.log('Content saved to result.json');
  });
}
