import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { router } from './routes/api';
import aws from 'aws-sdk';

aws.config.region = 'eu-west-1';

export const App = async () => {
  const restApi = express();
  restApi.use(bodyParser.json());
  restApi.use(cors());
  restApi.use(express.static(path.resolve(__dirname, '../../client/dist')));
  restApi.use(
    '/uploads',
    express.static(path.resolve(__dirname, '../../public/uploads'))
  );
  restApi.use('/api', router);
  restApi.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
  });
  return { restApi };
};
