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
exports.ConnectionService = void 0;
const user_1 = require("../repository/user");
class connectionService {
    Follow(userId, followerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.userRepostory.getById(userId);
            if (user && user.friends.map((friend) => friend.toString()).includes(followerId.toString())) {
                return {
                    status: 400,
                    data: null,
                    error: {
                        message: "Already follow"
                    }
                };
            }
            yield user_1.userRepostory.Follow(userId, followerId);
            return {
                status: 200,
                data: {
                    message: "followed"
                },
                error: null
            };
        });
    }
}
exports.ConnectionService = new connectionService();
