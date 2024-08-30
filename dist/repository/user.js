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
exports.userRepostory = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../model/user.model");
class UserRepostory {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = bcryptjs_1.default.hashSync(payload.password, 10);
            const result = yield user_model_1.UserModel.create({
                name: payload.name,
                email: payload.email,
                password: hashPassword
            });
            return {
                id: result._id,
                name: result.name,
                email: result.email
            };
        });
    }
    FindByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findOne({ email: email });
            return result;
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.findById(userId);
            console.log(result);
            return result;
        });
    }
    Follow(userId, followerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.UserModel.updateOne({ _id: userId }, {
                $push: {
                    friends: followerId
                }
            });
            return result;
        });
    }
}
exports.userRepostory = new UserRepostory();
