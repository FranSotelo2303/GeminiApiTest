import express from "express";
import Geminirouter from "./routes/Gemini.route.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/Question',Geminirouter);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});