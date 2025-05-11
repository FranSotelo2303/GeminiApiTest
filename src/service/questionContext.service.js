import prisma from "../db/prisma.js";

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

    return updatedAudit;
}