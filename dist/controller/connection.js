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
exports.getAllUsers = exports.ConnectionChain = exports.follow = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../model/user.model");
const isAuthenticate_1 = require("../middleware/isAuthenticate");
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = yield (0, isAuthenticate_1.getUser)(req);
        let userId = req.params.userId;
        let followerId = payload.id;
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
const ConnectionChain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const source = req.query.source;
        const destination = req.query.destination;
        if (!source || !destination) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Please provide both sourceId and destinationId."
                }
            });
        }
        const sourceUser = yield user_model_1.UserModel.findOne({ name: source }).lean();
        const destinationUser = yield user_model_1.UserModel.findOne({ name: destination }).lean();
        if (!sourceUser || !destinationUser) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "User not found."
                }
            });
        }
        const sourceObjectId = sourceUser._id;
        const destinationObjectId = destinationUser._id;
        let paths = [];
        let isVisited = new Set();
        let tempPath = [];
        function DFS(currentId, destinationId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (currentId == destinationId) {
                    paths.push([...tempPath]);
                    return;
                }
                const user = yield user_model_1.UserModel.findById(currentId).lean();
                const friends = (user === null || user === void 0 ? void 0 : user.friends) || [];
                for (const newFriend of friends) {
                    if (!isVisited.has(newFriend.toString())) {
                        isVisited.add(newFriend.toString());
                        tempPath.push(newFriend.toString());
                        yield DFS(newFriend.toString(), destinationId);
                        tempPath.pop();
                        isVisited.delete(newFriend.toString());
                    }
                }
            });
        }
        tempPath.push(sourceObjectId.toString());
        isVisited.add(sourceObjectId.toString());
        let ResultPath = [];
        yield DFS(sourceObjectId.toString(), destinationObjectId.toString());
        for (const path of paths) {
            let newPath = [];
            for (const userId of path) {
                const user = yield user_model_1.UserModel.findById(userId).lean();
                newPath.push(user);
            }
            ResultPath.push(newPath);
        }
        console.log(ResultPath);
        return res.status(200).json({
            status: 200,
            data: ResultPath,
            error: null
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "Something went wrong."
            }
        });
    }
});
exports.ConnectionChain = ConnectionChain;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield (0, isAuthenticate_1.getUser)(req);
        console.log(payload);
        if (!payload) {
            res.status(400).json({ status: 400, data: null, error: { message: "Please login first" } });
        }
        const Users = yield user_model_1.UserModel.find({ _id: { $ne: payload.id } });
        console.log(Users);
        res.status(200).json({ status: 200, data: Users, error: null });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            data: null,
            error: {
                message: "Something went wrong"
            }
        });
    }
});
exports.getAllUsers = getAllUsers;
