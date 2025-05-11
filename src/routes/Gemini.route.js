import express from 'express';
const Geminirouter = express.Router();
import {upload} from '../middleware/Gemini.middleware.js';
import { procesar, context } from '../controllers/Gemini.controller.js';

Geminirouter.post('/process', upload.single('imagen'), procesar);
Geminirouter.post('/context', context);

export default Geminirouter;