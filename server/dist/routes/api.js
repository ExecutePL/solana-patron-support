"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const actions_1 = require("../actions/api/actions");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const { getOrganization, createOrganization, getSocial_medias, createSocial_medias, getCurrency, createCurrency, getTransaction, createTransaction, } = actions_1.Actions;
exports.router.get("/get/organization", getOrganization);
exports.router.post("/create/organization", createOrganization);
exports.router.get("/get/social-medias", getSocial_medias);
exports.router.post("/create/social-medias", createSocial_medias);
exports.router.get("/get/currency", getCurrency);
exports.router.post("/create/currency", createCurrency);
exports.router.get("/get/transaction", getTransaction);
exports.router.post("/create/transaction", createTransaction);
