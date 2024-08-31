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
exports.getUser = exports.isAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['x-access-token'];
        console.log("token is ", token);
        if (!token || typeof token !== 'string') {
            return res.status(401).json({
                status: 401,
                data: null,
                error: {
                    message: "Please login first"
                }
            });
        }
        yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    data: null,
                    err: {
                        message: "Token expired"
                    }
                });
            }
            console.log(payload);
        });
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "somethink went wrong in Token verification"
            }
        });
    }
});
exports.isAuthenticate = isAuthenticate;
const getUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['x-access-token'];
        console.log(token);
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid token');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof payload === 'string') {
            throw new Error('Invalid token');
        }
        return payload;
    }
    catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
});
exports.getUser = getUser;
