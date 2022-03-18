import express from 'express';
import multer from 'multer';
import { Actions } from '../actions/api/actions';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

export const router = express.Router();

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
aws.config.update({
  secretAccessKey: 'jnXpdBOZtfiwjqwZ35gwhVE2DqLoQry1t0NKuWeP',
  accessKeyId: 'AKIAVVKH7VVUJ64CDJVD',
  region: 'us-west-1',
});
var s3 = new aws.S3({});
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bucketeer-e7231680-281b-42d8-9659-5ec4db91989f',

    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      cb(null, 'public/' + uuidv4() + '.' + fileExtension);
    },
  }),
});

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
} = Actions;

router.get('/get/organization', getOrganization);
router.post('/create/organization', upload.single('file'), createOrganization);
router.post('/get/one-organization', getSingleOrganization);

router.get('/get/social-medias', getSocial_medias);
router.post('/create/social-medias', createSocial_medias);

router.get('/get/currency', getCurrency);
router.post('/create/currency', createCurrency);

router.get('/get/transaction', getTransaction);
router.post('/create/transaction', createTransaction);
