"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("../controller/connection");
const isAuthenticate_1 = require("../middleware/isAuthenticate");
const router = express_1.default.Router();
router.post('/follow/:userId', isAuthenticate_1.isAuthenticate, connection_1.follow);
router.get('/connect', isAuthenticate_1.isAuthenticate, connection_1.getConnectionChain);
router.get('/users', isAuthenticate_1.isAuthenticate, connection_1.getAllUsers);
exports.default = router;
