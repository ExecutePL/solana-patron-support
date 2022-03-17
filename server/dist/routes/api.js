"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const actions_1 = require("../actions/api/actions");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
exports.router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        cb(null, fileName + '-' + uniqueSuffix + '.' + fileExtension);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const { getOrganization, getSingleOrganization, createOrganization, getSocial_medias, createSocial_medias, getCurrency, createCurrency, getTransaction, createTransaction, } = actions_1.Actions;
exports.router.get('/get/organization', getOrganization);
exports.router.post('/create/organization', upload.single('file'), createOrganization);
exports.router.get('/get/one-organization', getSingleOrganization);
exports.router.get('/get/social-medias', getSocial_medias);
exports.router.post('/create/social-medias', createSocial_medias);
exports.router.get('/get/currency', getCurrency);
exports.router.post('/create/currency', createCurrency);
exports.router.get('/get/transaction', getTransaction);
exports.router.post('/create/transaction', createTransaction);
