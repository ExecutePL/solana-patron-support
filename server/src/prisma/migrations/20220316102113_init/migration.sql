/*
  Warnings:

  - You are about to drop the column `collateral` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `spl` on the `Currency` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('spl', 'collateral');

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "collateral",
DROP COLUMN "spl",
ADD COLUMN     "type" "CurrencyType" NOT NULL DEFAULT E'spl';

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
