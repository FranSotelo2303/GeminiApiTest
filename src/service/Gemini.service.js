import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadHistory, saveHistory } from './Context.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tu API Key
const genAI = new GoogleGenerativeAI("AIzaSyDWXx0Dm8SvgSTc2FKjPT-SA430VTiDLRw");

// Función principal
export const QuestionImage = async (text, userId, image) => {
  const history = loadHistory(userId);

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

  history.push({ role: "user", parts: [{ text: text }, imagePart] });

  /*const result = await model.generateContent([
    { text },
    imagePart
  ]);*/
  const result = await model.generateContent({ contents: history });

  const response = await result.response;
  console.log(response.text());

  history.push({ role: "model", parts: [{ text: response.text() }] });

  saveHistory(userId, history);

  return response.text();
}

export const ContextQuestion = async (text, userId) => {
  const history = loadHistory(userId);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  history.push({ role: "user", parts: [{ text: text }] });

  const result = await model.generateContent({ contents: history });

  const response = await result.response;
  console.log(response.text());
  history.push({ role: "model", parts: [{ text: response.text() }] });
  saveHistory(userId, history);

  return response.text();
}
