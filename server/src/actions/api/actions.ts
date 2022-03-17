import { PrismaClient } from '@prisma/client';
import express from 'express';
import {
  createCurrency,
  getOrganization,
  getSingleOrganization,
  createOrganization,
  createSocial_medias,
  createTransaction,
  getCurrency,
  getSocial_medias,
  getTransaction,
} from '../../prisma/index';

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

  static async getSingleOrganization(
    req: express.Request,
    res: express.Response
  ) {
    const prisma = new PrismaClient();
    const { uuid } = req.body;

    getSingleOrganization(uuid)
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
    const {
      organization_name,
      description,
      target_raised,
      organization_adress,
      type,
      discord,
      facebook,
      instagram,
      telegram,
      twitter,
      currencyId,
    } = JSON.parse(req.body.data);

    const organization_foto_src = `${req.headers.origin}/uploads/${req.file?.filename}`;

    createOrganization(
      organization_name,
      description,
      organization_foto_src,
      target_raised,
      organization_adress,
      type,
      discord,
      facebook,
      instagram,
      telegram,
      twitter,
      currencyId
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
    const { name, symbol, decimals, min_decimals, adress, foto_src, type } =
      req.body;

    createCurrency(name, symbol, decimals, min_decimals, adress, foto_src, type)
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

  static async getTransaction(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const {} = req.body;

    getTransaction()
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

  static async createTransaction(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const { amount, donator_adress, organizationWallet, currencyName } =
      req.body;

    createTransaction(amount, donator_adress, organizationWallet, currencyName)
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
