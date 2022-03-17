"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getTransaction = exports.createCurrency = exports.getCurrency = exports.createSocial_medias = exports.getSocial_medias = exports.createOrganization = exports.getSingleOrganization = exports.getOrganization = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const getOrganization = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.organization.findMany({
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
});
exports.getOrganization = getOrganization;
const getSingleOrganization = (uuid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.organization.findUnique({
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
});
exports.getSingleOrganization = getSingleOrganization;
const createOrganization = (organization_name, description = '', organization_foto_src = '', target_raised, organization_adress = '', type, discord = '', facebook = '', instagram = '', telegram = '', twitter = '', currencyId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = currencyId.map((a) => ({
        currencyId: a,
    }));
    return yield prisma.organization.create({
        data: {
            uuid: (0, uuid_1.v4)(),
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
});
exports.createOrganization = createOrganization;
const getSocial_medias = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.social_medias.findMany({
        select: {
            organizationId: true,
            twitter: true,
            facebook: true,
            instagram: true,
            discord: true,
            telegram: true,
        },
    });
});
exports.getSocial_medias = getSocial_medias;
const createSocial_medias = (organizationId, twitter = '', facebook = '', instagram = '', discord = '', telegram = '') => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.social_medias.create({
        data: {
            organizationId,
            twitter,
            facebook,
            instagram,
            discord,
            telegram,
        },
    });
});
exports.createSocial_medias = createSocial_medias;
const getCurrency = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.currency.findMany({
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
});
exports.getCurrency = getCurrency;
const createCurrency = (name, symbol, decimals, min_decimals, adress, foto_src = '', type) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.currency.create({
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
});
exports.createCurrency = createCurrency;
const getTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.transaction.findMany({
        select: {
            amount: true,
            donator_adress: true,
            organizationId: true,
            currencyId: true,
            createdAt: true,
        },
    });
});
exports.getTransaction = getTransaction;
const createTransaction = (amount, donator_adress, organizationId, currencyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.transaction.create({
        data: {
            amount,
            donator_adress,
            organizationId,
            currencyId,
        },
    });
});
exports.createTransaction = createTransaction;
