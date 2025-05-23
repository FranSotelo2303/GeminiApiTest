import { proccesResult, proccesResultErrors } from "../controllers/result.controller.js";
import { Router } from "express";

const resultRouter = Router();

resultRouter.get("/get/:auditId", proccesResult);
resultRouter.get("/get/errors/:auditId", proccesResultErrors);

export default resultRouter;