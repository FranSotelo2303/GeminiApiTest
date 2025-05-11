import { Router } from "express";
import {upload} from '../middleware/Gemini.middleware.js';
import { processPageContext, processQuestionContext } from "../controllers/context.controller.js";

const axeRouter = Router();

axeRouter.post("/process", upload.single('screenshot'), processPageContext);
axeRouter.post("/question", processQuestionContext);


export default axeRouter;