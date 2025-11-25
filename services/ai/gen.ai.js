

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
        : 'gemini-2.5-flash',

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
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
        ...(!tool.generate && {
          systemInstruction: {
          role: 'system',
          parts: [{
            text: `أنت مساعد ذكاء اصطناعي اسمه "اكزاز" (Xaztom).
تم تطويرك بواسطة "بشار الحسين".
عند التحدث مع المستخدم، استخدم اسمه، اسمه هو ${userInfo.name}.
تجنب التحدث عن كونك نموذج ذكاء اصطناعي أو تابع لأي جهة أو شركة.
لا تكرر اسمك أو اسم المستخدم أو اسم المطور إلا عند الحاجة الطبيعية في الحوار.`
          }]
        },
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
