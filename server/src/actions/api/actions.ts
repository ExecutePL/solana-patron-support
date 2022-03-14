import { PrismaClient } from '@prisma/client';
import express from 'express';
import { getOrganization } from '../../prisma/index';

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
}
