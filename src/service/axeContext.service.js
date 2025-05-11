import prisma from "../db/prisma.js";

export const createPageContext = async (pageContext) => {
  const { website, axeContext, imagePath } = pageContext;

  const exitsWebsite = await prisma.User.findFirst({
    where: {
      website: website,
    },
  });

  if (exitsWebsite) {
    const newAudit = await prisma.Audit.create({
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

  const newUser = await prisma.User.create({
    data: {
      website: website,
      createdAt: new Date(),
    },
  });

  const newAudit = await prisma.Audit.create({
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
