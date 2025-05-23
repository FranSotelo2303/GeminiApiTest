import prisma from "../db/prisma.js";
import { createResult } from "./result.service.js";

export const createQuestionContext = async (auditId ,questionContext) => {
    const exitsAudit = await prisma.audit.findFirst({
        where: {
            id: auditId,
        },
    });

    if (!exitsAudit) {
        throw new Error("Audit not found");
    }

    const updatedAudit = await prisma.audit.update({
        where: {
            id: auditId,
        },
        data: {
            questionsContext: { data: questionContext },
        },
    });

    if (!updatedAudit) {
        throw new Error("Failed to update audit");
    }

    const result = await createResult(auditId);

    if (!result) {
        throw new Error("Failed to create result");
    }

    return updatedAudit;
}