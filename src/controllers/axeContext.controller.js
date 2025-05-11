import { createPageContext } from "../service/axeContext.service.js";

export const processPageContext = async (req, res) => {
  const { website, axeContext } = req.body;

  if (!website || !axeContext) {
    return res.status(400).json({ error: "Website or axeContext is missing" });
  }

  try {
    const result = await createPageContext({ website, axeContext });
    res.json({ message: "Processed successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
