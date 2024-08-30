"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./router/auth"));
const connection_1 = __importDefault(require("./router/connection"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is running"
    });
});
app.use('/api/v1/auth/', auth_1.default);
app.use('/api/v1/connection', connection_1.default);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
(0, database_1.connectDB)();
