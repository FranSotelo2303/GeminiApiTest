import prisma from "../db/prisma.js";

export const createPageContext = async (pageContext) => {
  const { website, axeContext, imagePath } = pageContext;

  const exitsWebsite = await prisma.user.findFirst({
    where: {
      website: website,
    },
  });

  if (exitsWebsite) {
    const newAudit = await prisma.audit.create({
      data: {
        axeContext: { data: axeContext },
        questionsContext: {}, 
        imagePath: imagePath || "", 
        user: {
          connect: {
            id: exitsWebsite.id,
          },
        },
      },
    });
    return newAudit;
  }

  const newUser = await prisma.user.create({
    data: {
      website: website,
      createdAt: new Date(),
    },
  });

  const newAudit = await prisma.audit.create({
    data: {
      axeContext: { data: axeContext },
      questionsContext: {}, 
      imagePath: imagePath || "", 
      user: {
        connect: {
          id: newUser.id,
        },
      },
    },
  });

  return newAudit;
};
