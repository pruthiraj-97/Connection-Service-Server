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
exports.Login = exports.Register = void 0;
const zod_1 = require("../utils/zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../model/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        const isValidate = zod_1.signUpData.safeParse(payload);
        console.log(isValidate);
        if (!isValidate.success) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Enter all validate data"
                }
            });
        }
        const isExist = yield user_model_1.UserModel.findOne({ email: payload.email });
        if (isExist) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "user already exist"
                }
            });
        }
        const hashPassword = bcryptjs_1.default.hashSync(payload.password, 10);
        const result = yield user_model_1.UserModel.create({
            name: payload.name,
            email: payload.email,
            password: hashPassword
        });
        return res.status(200).json({
            status: 200,
            data: {
                user: result
            },
            error: null
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "something went wrong"
            }
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            email: req.body.email,
            password: req.body.password
        };
        const isValidate = zod_1.loginData.safeParse(payload);
        if (!isValidate.success) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Enter all validate data"
                }
            });
        }
        const isUserExist = yield user_model_1.UserModel.findOne({ email: payload.email });
        if (!isUserExist) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "user not found"
                }
            });
        }
        const isMatch = bcryptjs_1.default.compareSync(payload.password, isUserExist.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "password not match"
                }
            });
        }
        const userDetains = {
            id: isUserExist._id,
            name: isUserExist.name,
        };
        const token = jsonwebtoken_1.default.sign(userDetains, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({
            status: 200,
            data: {
                user: isUserExist
            },
            error: null
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "something went wrong"
            }
        });
    }
});
exports.Login = Login;
