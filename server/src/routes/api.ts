import { Actions } from "../actions/api/actions";
import express from "express";

export const router = express.Router();
const {
  getOrganization,
  getSingleOrganization,
  createOrganization,
  getSocial_medias,
  createSocial_medias,
  getCurrency,
  createCurrency,
  getTransaction,
  createTransaction,
  createManyCurrencies,
} = Actions;

router.get("/get/organization", getOrganization);
router.get("/get/one-organization", getSingleOrganization);
router.post("/create/organization", createOrganization);

router.get("/get/social-medias", getSocial_medias);
router.post("/create/social-medias", createSocial_medias);

router.get("/get/currency", getCurrency);
router.post("/create/currency", createCurrency);
router.post("/create/many-currencies", createManyCurrencies);

router.get("/get/transaction", getTransaction);
router.post("/create/transaction", createTransaction);
