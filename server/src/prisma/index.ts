import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const getOrganization = async () => {
  return await prisma.organization.findMany({
    select: {
      name: true,
    },
  });
};

export const createOrganization = async (
  name: string,
  description: string = "",
  foto_src: string = "",
  target_raised: number,
  adress: string,
  type: string
) => {
  return await prisma.organization.create({
    data: {
      uuid: uuidv4(),
      name,
      description,
      foto_src,
      target_raised,
      adress,
      type,
      socials: {
        create: {},
      },
    },
  });
};

export const getSocial_medias = async () => {
  return await prisma.social_medias.findMany({
    select: {
      organizationId: true,
      twitter: true,
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
      spl: true,
      collateral: true,
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
  spl: boolean,
  collateral: boolean
) => {
  return await prisma.currency.create({
    data: {
      name,
      symbol,
      decimals,
      min_decimals,
      adress,
      foto_src,
      spl,
      collateral,
    },
  });
};
