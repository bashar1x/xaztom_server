import Image from "../models/Image.js";

export default async function fileToUrl(name, mimeType, buffer) {
  console.log('fileToUrl started');
  try {
    const image = await Image.create({
      name,
      mimeType,
      data: buffer,
    });

    return `https://zin-ai.onrender.com/api/app/images/${image._id}`
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}