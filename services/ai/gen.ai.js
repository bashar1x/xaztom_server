import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI });

export default async function GenAi(content, tool, userInfo) {
  console.log('start GenAi', userInfo);
  
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
          ...(tool.generate ? [] : [{ urlContext: {} }]),
        ],
        topP: 1,
        temperature: 1.5,
        maxOutputTokens: tool.generate ? 8192 : 40000,
        responseMimeType: 'text/plain',
        ...(!tool.generate && {
          systemInstruction: [
            'your name is "xaztom"',
            `my name is "${userInfo.name}"`,
            'you programmer and creator is "bashar hussain"',
          ]
        }),

      },
    });
    console.log('finsh GenAi', userInfo);
    return {
      content: result?.candidates?.[0]?.content,
      serching: result?.candidates?.[0]?.groundingMetadata?.groundingChunks
    }

  } catch (error) {
    console.error("Error in GenAi:", error);
    throw error;
  }
}
