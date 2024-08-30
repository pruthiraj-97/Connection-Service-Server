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
exports.follow = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../model/user.model");
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = req.query.userId;
        let followerId = req.query.followerId;
        if (!userId || !followerId) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Enter user and follower id"
                }
            });
        }
        if (typeof followerId != "string" || typeof userId != "string") {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Enter user and follower id"
                }
            });
        }
        const user = yield user_model_1.UserModel.findOne({ _id: followerId });
        console.log(user);
        if (user && user.friends.includes(new mongoose_1.Types.ObjectId(userId))) {
            return res.status(200).json({
                status: 400,
                data: null,
                error: {
                    message: "Already follow"
                }
            });
        }
        yield user_model_1.UserModel.updateOne({ _id: followerId }, { $push: { friends: userId } });
        return res.status(200).json({ status: 200,
            data: {
                message: "followed"
            },
            error: null
        });
    }
    catch (error) {
        return res.status(500).json({ status: 500, data: null, error: { message: "something went wrong" } });
    }
});
exports.follow = follow;
