import {Question} from '../service/Gemini.service.js';

export const procesar = async (req, res) => {
    const Data = req.body;
    const texto = Data.texto;
    const imagen = req.file;
    console.log(texto);
    console.log(imagen);
    if (!texto || !imagen) {
        return res.status(400).json({ error: 'Texto o imagen faltante' });
    }

    const resultado = await Question(texto, imagen);

    res.json({ mensaje: 'Procesado con éxito', resultado });
};

