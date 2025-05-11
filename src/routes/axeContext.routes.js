import { Router } from "express";
import {upload} from '../middleware/Gemini.middleware.js';
import { processPageContext } from "../controllers/axeContext.controller.js";


const axeRouter = Router();

axeRouter.post("/process", upload.single('screenshot'), processPageContext);

export default axeRouter;