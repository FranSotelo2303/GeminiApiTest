import { Router } from "express";
import { processPageContext } from "../controllers/axeContext.controller.js";


const axeRouter = Router();

axeRouter.post("/process", processPageContext);

export default axeRouter;