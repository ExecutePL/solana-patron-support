import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { router } from './routes/api';

export const App = async () => {
  const restApi = express();
  restApi.use(bodyParser.json());
  restApi.use(cors());
  restApi.use(
    '/uploads',
    express.static(path.resolve(__dirname, '../../public/uploads'))
  );
  restApi.use(express.static(path.resolve(__dirname, '../../client/dist')));
  restApi.use('/api', router);
  restApi.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
  });
  return { restApi };
};
