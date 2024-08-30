"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginData = exports.signUpData = void 0;
const zod_1 = require("zod");
exports.signUpData = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "password must be at least 6 characters long")
});
exports.loginData = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, "password must be at least 6 characters long")
});
