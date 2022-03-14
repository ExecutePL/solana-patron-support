import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOrganization = async () => {
  return await prisma.organization.findMany({
    select: {
      name: true,
    },
  });
};
