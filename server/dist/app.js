"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = require("./routes/api");
const App = () => __awaiter(void 0, void 0, void 0, function* () {
    const restApi = (0, express_1.default)();
    restApi.use(body_parser_1.default.json());
    restApi.use((0, cors_1.default)());
    restApi.use(express_1.default.static(path_1.default.resolve(__dirname, '../../client/dist')));
    restApi.use('/api', api_1.router);
    restApi.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../client/dist', 'index.html'));
    });
    return { restApi };
});
exports.App = App;
