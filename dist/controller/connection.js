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
exports.getConnectionChain = exports.follow = void 0;
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
const getConnectionChain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sourceId = req.query.sourceId;
        const destinationId = req.query.DestinationId;
        if (!sourceId || !destinationId) {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "Please provide both sourceId and destinationId."
                }
            });
        }
        if (typeof sourceId !== "string" || typeof destinationId !== "string") {
            return res.status(400).json({
                status: 400,
                data: null,
                error: {
                    message: "sourceId and destinationId must be strings."
                }
            });
        }
        let paths = [];
        let isVisited = new Set();
        let tempPath = [];
        function DFS(currentId, destinationId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (currentId.toString() === destinationId.toString()) {
                    paths.push([...tempPath]);
                    return;
                }
                const user = yield user_model_1.UserModel.findOne({ _id: currentId }).lean();
                const friends = user === null || user === void 0 ? void 0 : user.friends;
                if (friends) {
                    for (const newFriend of friends) {
                        if (!isVisited.has(newFriend)) {
                            isVisited.add(newFriend);
                            tempPath.push(newFriend);
                            yield DFS(newFriend, destinationId);
                            tempPath.pop();
                            isVisited.delete(newFriend);
                        }
                    }
                }
            });
        }
        const sourceObjectId = new mongoose_1.Types.ObjectId(sourceId);
        const destinationObjectId = new mongoose_1.Types.ObjectId(destinationId);
        tempPath.push(sourceObjectId);
        isVisited.add(sourceObjectId);
        yield DFS(sourceObjectId, destinationObjectId);
        const ResultPath = [];
        for (const path of paths) {
            let newPath = [];
            for (const node of path) {
                const user = yield user_model_1.UserModel.findById(node);
                newPath.push(user);
            }
            ResultPath.push(newPath);
        }
        return res.status(200).json({
            status: 200,
            data: {
                ResultPath
            },
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
exports.getConnectionChain = getConnectionChain;
