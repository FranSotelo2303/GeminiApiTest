import { getResult } from "../service/result.service.js";

export const proccesResult = async (req, res) => {
    const { auditId } = req.body;

    if (!auditId) {
        return res.status(400).json({ error: "Audit ID is missing" });
    }

    try {
        const result = await getResult(auditId);
        res.json({ message: "Processed successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}