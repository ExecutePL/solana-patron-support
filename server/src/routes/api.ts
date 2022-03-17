import { Actions } from '../actions/api/actions';
import express from 'express';
import multer from 'multer';
import fs from 'fs';

export const router = express.Router();

const storage = multer.diskStorage({
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
const upload = multer({ storage: storage });

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

router.get('/get/organization', getOrganization);
router.post('/create/organization', upload.single('file'), createOrganization);

router.get('/get/social-medias', getSocial_medias);
router.post('/create/social-medias', createSocial_medias);

router.get('/get/currency', getCurrency);
router.post('/create/currency', createCurrency);

router.get('/get/transaction', getTransaction);
router.post('/create/transaction', createTransaction);
