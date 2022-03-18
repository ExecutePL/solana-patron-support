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
exports.Actions = void 0;
const client_1 = require("@prisma/client");
const index_1 = require("../../prisma/index");
class Actions {
    static getOrganization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const {} = req.body;
            (0, index_1.getOrganization)()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static getSingleOrganization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const { uuid } = req.body;
            (0, index_1.getSingleOrganization)(uuid)
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static createOrganization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const { organization_name, description, target_raised, organization_adress, type, discord, facebook, instagram, telegram, twitter, currencyId, } = JSON.parse(req.body.data);
            // const s3 = new AWS.S3();
            // const fileName = req.file?.filename;
            // const fileType = req.query['file-type'];
            // const S3_BUCKET = 'bucketeer-e7231680-281b-42d8-9659-5ec4db91989f';
            // const s3Params = {
            //   Bucket: S3_BUCKET,
            //   Key: fileName,
            //   Expires: 60,
            //   ContentType: fileType,
            //   ACL: 'public-read',
            // };
            // let organization_foto_src;
            // s3.getSignedUrl('putObject', s3Params, (err, data) => {
            //   if (err) {
            //     console.log(err);
            //     return res.end();
            //   }
            //   const returnData = {
            //     signedRequest: data,
            //     url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
            //   };
            //   organization_foto_src = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
            // });
            // console.log(organization_foto_src);
            console.log(req.file.location);
            // const organization_foto_src = `${req.headers.origin}/uploads/${req.file?.filename}`;
            const organization_foto_src = req.file.location;
            (0, index_1.createOrganization)(organization_name, description, organization_foto_src, target_raised, organization_adress, type, discord, facebook, instagram, telegram, twitter, currencyId)
                .then((data) => {
                res.status(200).json();
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static getSocial_medias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const {} = req.body;
            (0, index_1.getSocial_medias)()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static createSocial_medias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const { organizationId, twitter, facebook, instagram, discord, telegram } = req.body;
            (0, index_1.createSocial_medias)(organizationId, twitter, facebook, instagram, discord, telegram)
                .then((data) => {
                res.status(200).json();
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static getCurrency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const {} = req.body;
            (0, index_1.getCurrency)()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static createCurrency(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const { name, symbol, decimals, min_decimals, adress, foto_src, type } = req.body;
            (0, index_1.createCurrency)(name, symbol, decimals, min_decimals, adress, foto_src, type)
                .then((data) => {
                res.status(200).json();
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static getTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const {} = req.body;
            (0, index_1.getTransaction)()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
    static createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma = new client_1.PrismaClient();
            const { amount, donator_adress, organizationWallet, currencyName } = req.body;
            (0, index_1.createTransaction)(amount, donator_adress, organizationWallet, currencyName)
                .then((data) => {
                res.status(200).json();
            })
                .catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                yield prisma.$disconnect();
            }));
        });
    }
}
exports.Actions = Actions;
