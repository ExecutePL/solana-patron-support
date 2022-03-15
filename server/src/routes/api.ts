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
} = Actions;

router.get("/get/organization", getOrganization);
router.post("/create/organization", createOrganization);

router.get("/get/social_medias", getSocial_medias);
router.post("/create/social_medias", createSocial_medias);

router.get("/get/currency", getCurrency);
router.post("/create/currency", createCurrency);
