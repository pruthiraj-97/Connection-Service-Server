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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_1 = require("../repository/user");
class authService {
    signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_1.userRepostory.FindByEmail(payload.email);
            if (isExist) {
                return {
                    status: 400,
                    data: null,
                    error: {
                        message: "user already exist"
                    }
                };
            }
            const result = yield user_1.userRepostory.create(payload);
            return {
                status: 200,
                data: result,
                error: null
            };
        });
    }
}
exports.AuthService = new authService();
