import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tu API Key
const genAI = new GoogleGenerativeAI("AIzaSyDWXx0Dm8SvgSTc2FKjPT-SA430VTiDLRw");

// Función principal
export const Question = async(text, image) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const routeImage = path.join(__dirname, '..', 'uploads', image.filename);
  const imageBuffer = fs.readFileSync(routeImage);
  const imageBase64 = imageBuffer.toString('base64');

  // Crear el objeto con el MIME type adecuado
  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg", // o "image/png" según el tipo real
      data: imageBase64,
    },
  };

  const result = await model.generateContent([
    { text },
    imagePart
  ]);

  const response = await result.response;
  console.log(response.text());
  return response.text();
}
