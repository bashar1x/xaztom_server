import uploadFile from '../services/ai/uploadFile.js';
import fileToUrl from '../services/fileToUrl.js';

export default async function processParts(parts, serching) {
    const updatedParts = [];

    for (const part of parts) {
        if (!part.inlineData) { updatedParts.push(part); continue; }

        try {
            const { data, mimeType } = part.inlineData;
            const originalname = `file-ai-${Date.now()}.png`;
            const mimetype = mimeType;
            const buffer = Buffer.from(data, 'base64');

            const [result1, result2] = await Promise.all([
                uploadFile(data, mimetype),
                fileToUrl(originalname, mimetype, buffer)
            ]);


            const fileData = {
                fileUri: result1.uri,
                mimeType: result1.mimeType,
                more: {
                    name: originalname,
                    type: mimetype.split('/')[0],
                    url: result2 || null
                }
            };

            updatedParts.push({ fileData });

        } catch (error) {
            console.error("Error processing inlineData part:", error);
            updatedParts.push(part);
        }
    }

    return {
      role: 'model',
      parts: updatedParts,
      serching
    }
}
