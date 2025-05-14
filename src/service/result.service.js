import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../db/prisma.js";


// Tu API Key
const genAI = new GoogleGenerativeAI("AIzaSyDWXx0Dm8SvgSTc2FKjPT-SA430VTiDLRw");

export const getResult = async (auditID) => {
    const audit = await prisma.audit.findUnique({
        where: {
        id: auditID,
        }
    });
    
    if (!audit) {
        throw new Error("Audit not found");
    }
    
    const axeContext = audit.axeContext.data;
    const questionsContext = audit.questionsContext.data;


    if (!axeContext || !questionsContext) {
        throw new Error("No axeContext or questionsContext found");
    }

    // Convert the axeContext and questionsContext to TEXT and ask the model to generate a response
    const axeContextText = JSON.stringify(axeContext);
    const questionsContextText = JSON.stringify(questionsContext);

    const accessibilityResult = await makeQuestion(`Los siguientes son resultados generados por la libreria axe-core. Por favor, genera un resumen de los resultados de la auditoría de accesibilidad y explica bien los errores: ${axeContextText}\n Para mas contexto el usuario brindó el siguiente texto, hazlo en español por favor: ${questionsContextText}`);

    const usabilityResult = await makeQuestionWithImage(`La siguiente imagen es una captura de una pagina web, para mas contexto el usuario brindó el siguiente texto: ${questionsContextText}\n Quiero que realices una evaluacion usando las heuristicas de nielsen de la pagina, hazlo en español por favor`,  audit.imagePath);

    const culturalResult = await makeQuestion(`La siguiente imagen es una captura de una pagina web, para mas contexto el usuario brindó el siguiente texto: ${questionsContextText}\n Quiero que realices una evaluacion en terminos de sentido cultural de la pagina, que tan bien adecua su contenido para el publico objetivo basandose en su cultura y aspectos como estos, hazlo en español por favor`,  audit.imagePath);

    const result = prisma.auditResult.create({
        data: {
            accessibilityResults: accessibilityResult,
            usabilityResults: usabilityResult,
            culturalResults: culturalResult,
            auditId: auditID,
            score: 0,
        }
    });

    return result;
}

const makeQuestion = async (text) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const question = [{ role: "user", parts: [{ text: text }] }];

    const result = await model.generateContent({ contents: question });

    const response = result.response;

    return response.text();
}

const makeQuestionWithImage = async (text, imagePath) => {

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const routeImage = path.join(imagePath);
    const imageBuffer = fs.readFileSync(routeImage);
    const imageBase64 = imageBuffer.toString('base64');

    
    const imagePart = {
        inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
        },
    };

    const question = [{ role: "user", parts: [{ text: text }, imagePart] }];

    const result = await model.generateContent({ contents: question });

    const response = result.response;

    return response.text();
}