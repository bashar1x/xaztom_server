import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI });

export default async function GenAi(content) {
    console.log(content);
    
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-preview-image-generation', //gemini-2.5-flash-preview-04-17
            contents: content,
            config: {
                responseModalities: ['IMAGE','TEXT'],
                // temperature: 0.5,
                // topP: 0.8,
                // topK: 40,
                responseMimeType: 'text/plain',
            }
        });
        return result?.candidates[0].content;
    } catch (error) {
        console.error("Error in GenAi:", error);
        throw error;
    }
};



// function saveBinaryFile(fileName, content) {
//   writeFile(fileName, content, 'utf8', (err) => {
//     if (err) {
//       console.error(`Error writing file ${fileName}:`, err);
//       return;
//     }
//     console.log(`File ${fileName} saved to file system.`);
//   });
// }


// export default async function GenAi() {

//   const config = {
//     responseModalities: [
//       'image',
//       'text',
//     ],
//     responseMimeType: 'text/plain',
//   };
//   const model = 'gemini-2.0-flash-exp-image-generation';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `مرحبا كيف حالك اريد صوره كلب ابيض`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   for await (const chunk of response) {
//     if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
//       continue;
//     }
//     console.log('ccccccccccccc=>>>', chunk);
    
//     if (chunk.candidates[0].content.parts[0].inlineData) {
//       fs.writeFileSync("result.json", JSON.stringify(chunk, null, 2), "utf-8");
//       const fileName = 'ENTER_FILE_NAME';
//       const inlineData = chunk.candidates[0].content.parts[0].inlineData;
//       let fileExtension = mime.getExtension(inlineData.mimeType || '');
//       let buffer = Buffer.from(inlineData.data || '', 'base64');
//       saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
//     }
//     else {
//       console.log(chunk.text);
//     }
//   }
// }