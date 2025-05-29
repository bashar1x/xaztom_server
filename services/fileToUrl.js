import Image from "../models/Image.js";

export default async function fileToUrl(name, mimeType, buffer) {
  console.log('fileToUrl started');
  try {
    const image = await Image.create({
      name,
      mimeType,
      data: buffer,
    });

    return `http://10.50.4.147:3000/api/app/images/${image._id}`
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}