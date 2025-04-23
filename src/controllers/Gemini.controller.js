import { QuestionImage, ContextQuestion } from '../service/Gemini.service.js';

export const procesar = async (req, res) => {
    const Data = req.body;
    console.log(Data);
    const texto = Data.texto;
    const userId = Data.userId;
    const imagen = req.file;
    console.log(texto);
    console.log(imagen);
    if (!texto || !imagen) {
        return res.status(400).json({ error: 'Texto o imagen faltante' });
    }

    const resultado = await QuestionImage(texto, userId, imagen);

    res.json({ mensaje: 'Procesado con éxito', resultado });
};

export const context = async (req, res) => {
    const Data = req.body;
    console.log("DataC "+ Data);
    const texto = Data.texto;
    const userId = Data.userId;
    console.log(texto);
    
    if (!texto) {
        return res.status(400).json({ error: 'Texto faltante' });
    }

    const resultado = await ContextQuestion(texto, userId);

    res.json({ mensaje: 'Procesado con éxito', resultado });
};