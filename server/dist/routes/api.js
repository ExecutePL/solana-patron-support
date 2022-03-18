"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const actions_1 = require("../actions/api/actions");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = require("uuid");
exports.router = express_1.default.Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const fileName = file.originalname.split('.')[0];
//     const fileExtension = file.originalname.split('.')[1];
//     cb(null, fileName + '-' + uniqueSuffix + '.' + fileExtension);
//   },
// });
// const upload = multer({ storage: storage });
aws_sdk_1.default.config.update({
    secretAccessKey: 'jnXpdBOZtfiwjqwZ35gwhVE2DqLoQry1t0NKuWeP',
    accessKeyId: 'AKIAVVKH7VVUJ64CDJVD',
    region: 'us-west-1',
});
var s3 = new aws_sdk_1.default.S3({});
var upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'bucketeer-e7231680-281b-42d8-9659-5ec4db91989f',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileName = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            cb(null, 'public/' + (0, uuid_1.v4)() + '.' + fileExtension);
        },
    }),
});
const { getOrganization, getSingleOrganization, createOrganization, getSocial_medias, createSocial_medias, getCurrency, createCurrency, getTransaction, createTransaction, } = actions_1.Actions;
exports.router.get('/get/organization', getOrganization);
exports.router.post('/create/organization', upload.single('file'), createOrganization);
exports.router.post('/get/one-organization', getSingleOrganization);
exports.router.get('/get/social-medias', getSocial_medias);
exports.router.post('/create/social-medias', createSocial_medias);
exports.router.get('/get/currency', getCurrency);
exports.router.post('/create/currency', createCurrency);
exports.router.get('/get/transaction', getTransaction);
exports.router.post('/create/transaction', createTransaction);
