import { Actions } from "../actions/api/actions";
import express from "express";

export const router = express.Router();
const {
  getOrganization,
  createOrganization,
  getSocial_medias,
  createSocial_medias,
  getCurrency,
  createCurrency,
  getTransaction,
  createTransaction,
} = Actions;

router.get("/get/organization", getOrganization);
router.post("/create/organization", createOrganization);

router.get("/get/social-medias", getSocial_medias);
router.post("/create/social-medias", createSocial_medias);

router.get("/get/currency", getCurrency);
router.post("/create/currency", createCurrency);

router.get("/get/transaction", getTransaction);
router.post("/create/transaction", createTransaction);
