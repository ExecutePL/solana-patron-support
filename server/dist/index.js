"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 5000;
(0, app_1.App)().then(({ restApi }) => restApi.listen(PORT, () => {
    console.log(`[restApi]: Server running at http://localhost:${PORT}`);
}));
