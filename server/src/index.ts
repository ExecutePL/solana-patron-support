import { App } from './app';

const PORT = process.env.PORT || 5000;

App().then(({ restApi }) =>
  restApi.listen(PORT, () => {
    console.log(`[restApi]: Server running at http://localhost:${PORT}`);
  })
);
