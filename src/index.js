import express from "express";
import Geminirouter from "./routes/Gemini.route.js";
import cors from "cors";
import axeRouter from "./routes/axeContext.routes.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/Question',Geminirouter);
app.use('/axeContext', axeRouter);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});