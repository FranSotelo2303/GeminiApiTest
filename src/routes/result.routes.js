import { proccesResult } from "../controllers/result.controller.js";
import { Router } from "express";

const resultRouter = Router();

resultRouter.post("/create", proccesResult);

export default resultRouter;