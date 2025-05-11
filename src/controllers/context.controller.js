import { createPageContext } from "../service/axeContext.service.js";
import { createQuestionContext } from "../service/questionContext.service.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processPageContext = async (req, res) => {
  const { website, axeContext } = req.body;

  console.log(website, axeContext);

  if (!website || !axeContext) {
    return res.status(400).json({ error: "Website or axeContext is missing" });
  }

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageName = file.filename;

  const imagePath = path.join(__dirname, "..", "uploads", imageName);

  try {
    const result = await createPageContext({ website, axeContext, imagePath });
    res.json({ message: "Processed successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const processQuestionContext = async (req, res) => {
  const { auditId, questionContext } = req.body;

  if (!auditId || !questionContext) {
    return res.status(400).json({ error: "Audit ID or question context is missing" });
  }

  try {
    const result = await createQuestionContext(auditId, questionContext);
    res.json({ message: "Processed successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
