"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = exports.authMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSecret_1 = require("../config/JWTSecret");
// Middleware to authenticate JWT token
const authMiddleware = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                statusCode: 401,
                isSuccess: false,
                message: (err === null || err === void 0 ? void 0 : err.message) || "User JWT unauthorized",
                data: user,
            });
        }
        // console.log("Valid JWT for ", user);
        next();
    })(req, res, next);
};
exports.authMiddleware = authMiddleware;
// Middleware to login user and sign JWT token
const loginMiddleware = (req, res, next) => {
    passport_1.default.authenticate("local", { session: false, failureMessage: true }, (err, user, info) => {
        if (err || !user) {
            console.log("err :>> ", err, user, info);
            return res.status(400).json({
                statusCode: 400,
                isSuccess: false,
                message: (err === null || err === void 0 ? void 0 : err.message) || "Could not login user",
                data: user,
            });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, name: user.name, userId: user._id }, JWTSecret_1.secretKey);
        res.header("Authorization", "Bearer " + token);
        return res.json({
            statusCode: 200,
            isSuccess: true,
            message: "Successfully logged user in",
            data: user,
        });
    })(req, res);
};
exports.loginMiddleware = loginMiddleware;
