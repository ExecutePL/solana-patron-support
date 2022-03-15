import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  getOrganization,
  createOrganization,
  getSocial_medias,
  createSocial_medias,
  getCurrency,
  createCurrency,
} from "../../prisma/index";

export class Actions {
  static async getOrganization(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const {} = req.body;

    getOrganization()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  static async createOrganization(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const { name, description, foto_src, target_raised, adress, type } =
      req.body;

    createOrganization(name, description, foto_src, target_raised, adress, type)
      .then((data) => {
        res.status(200).json();
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  static async getSocial_medias(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const {} = req.body;

    getSocial_medias()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  static async createSocial_medias(
    req: express.Request,
    res: express.Response
  ) {
    const prisma = new PrismaClient();
    const { organizationId, twitter, facebook, instagram, discord, telegram } =
      req.body;

    createSocial_medias(
      organizationId,
      twitter,
      facebook,
      instagram,
      discord,
      telegram
    )
      .then((data) => {
        res.status(200).json();
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  static async getCurrency(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const {} = req.body;

    getCurrency()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  static async createCurrency(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const {
      name,
      symbol,
      decimals,
      min_decimals,
      adress,
      foto_src,
      spl,
      collateral,
    } = req.body;

    createCurrency(
      name,
      symbol,
      decimals,
      min_decimals,
      adress,
      foto_src,
      spl,
      collateral
    )
      .then((data) => {
        res.status(200).json();
      })
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
}
