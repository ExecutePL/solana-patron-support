-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('spl', 'collateral');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "foto_src" TEXT,
    "total_raised" INTEGER NOT NULL DEFAULT 0,
    "target_raised" INTEGER NOT NULL,
    "adress" VARCHAR(45) NOT NULL,
    "type" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social_medias" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "twitter" VARCHAR(255),
    "facebook" VARCHAR(255),
    "instagram" VARCHAR(255),
    "discord" VARCHAR(255),
    "telegram" VARCHAR(255),

    CONSTRAINT "Social_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(8) NOT NULL,
    "decimals" INTEGER NOT NULL,
    "min_decimals" INTEGER NOT NULL DEFAULT 0,
    "adress" VARCHAR(45) NOT NULL,
    "foto_src" TEXT,
    "type" "CurrencyType" NOT NULL DEFAULT E'spl',

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "donator_adress" VARCHAR(45) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization_currencies" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,

    CONSTRAINT "Organization_currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_uuid_key" ON "Organization"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Social_medias_organizationId_key" ON "Social_medias"("organizationId");

-- AddForeignKey
ALTER TABLE "Social_medias" ADD CONSTRAINT "Social_medias_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization_currencies" ADD CONSTRAINT "Organization_currencies_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization_currencies" ADD CONSTRAINT "Organization_currencies_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
