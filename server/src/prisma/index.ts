import { Currency, CurrencyType, PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const getOrganization = async () => {
  return await prisma.organization.findMany({
    select: {
      uuid: true,
      name: true,
      description: true,
      foto_src: true,
      total_raised: true,
      target_raised: true,
      adress: true,
      type: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getSingleOrganization = async (uuid: string) => {
  return await prisma.organization.findUnique({
    where: {
      uuid,
    },
    select: {
      uuid: true,
      name: true,
      description: true,
      foto_src: true,
      total_raised: true,
      target_raised: true,
      adress: true,
      type: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
      socials: {
        select: {
          twitter: true,
          facebook: true,
          instagram: true,
          discord: true,
          telegram: true,
        },
      },
    },
  });
};

export const createOrganization = async (
  organization_name: string,
  description: string = "",
  organization_foto_src: string = "",
  target_raised: number,
  organization_adress: string,
  type: string,
  discord: string = "",
  facebook: string = "",
  instagram: string = "",
  telegram: string = "",
  twitter: string = "",
  currencyId: number[]
) => {
  const data = currencyId.map((a) => ({
    currencyId: a,
  }));
  return await prisma.organization.create({
    data: {
      uuid: uuidv4(),
      name: organization_name,
      description,
      foto_src: organization_foto_src,
      target_raised,
      adress: organization_adress,
      type,
      socials: {
        create: {
          discord,
          facebook,
          instagram,
          telegram,
          twitter,
        },
      },
      currencies: {
        createMany: {
          data,
        },
      },
    },
  });
};

export const getSocial_medias = async () => {
  return await prisma.social_medias.findMany({
    select: {
      organizationId: true,
      twitter: true,
      facebook: true,
      instagram: true,
      discord: true,
      telegram: true,
    },
  });
};

export const createSocial_medias = async (
  organizationId: number,
  twitter: string = "",
  facebook: string = "",
  instagram: string = "",
  discord: string = "",
  telegram: string = ""
) => {
  return await prisma.social_medias.create({
    data: {
      organizationId,
      twitter,
      facebook,
      instagram,
      discord,
      telegram,
    },
  });
};

export const getCurrency = async () => {
  return await prisma.currency.findMany({
    select: {
      name: true,
      symbol: true,
      decimals: true,
      min_decimals: true,
      adress: true,
      foto_src: true,
      type: true,
    },
  });
};

export const createCurrency = async (
  name: string,
  symbol: string,
  decimals: number,
  min_decimals: number,
  adress: string,
  foto_src: string = "",
  type: CurrencyType
) => {
  return await prisma.currency.create({
    data: {
      name,
      symbol,
      decimals,
      min_decimals,
      adress,
      foto_src,
      type,
    },
  });
};

export const createManyCurrencies = async (currencies: []) => {
  const data = currencies.map(
    ({ name, symbol, decimals, min_decimals, adress, foto_src, type }) => ({
      name,
      symbol,
      decimals,
      min_decimals,
      adress,
      foto_src,
      type,
    })
  );
  return await prisma.currency.createMany({
    data,
  });
};

export const getTransaction = async () => {
  return await prisma.transaction.findMany({
    select: {
      amount: true,
      donator_adress: true,
      organizationId: true,
      currencyId: true,
      createdAt: true,
    },
  });
};

export const createTransaction = async (
  amount: number,
  donator_adress: string,
  organizationId: number,
  currencyId: number
) => {
  return await prisma.transaction.create({
    data: {
      amount,
      donator_adress,
      organizationId,
      currencyId,
    },
  });
};
