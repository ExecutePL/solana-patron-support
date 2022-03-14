import { Actions } from '../actions/api/actions';
import express from 'express';

export const router = express.Router();
const { getOrganization } = Actions;

router.get('/get/organization', getOrganization);
