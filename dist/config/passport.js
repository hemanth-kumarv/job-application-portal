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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const loginUserService_1 = require("../service/v1/users/loginUserService");
const JWTSecret_1 = require("./JWTSecret");
const getUserDetailsService_1 = require("../service/v1/users/getUserDetailsService");
// Login strategy
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passwordField: "password" }, (email, password, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, loginUserService_1.loginUserService)({ email, password });
        return cb(null, user, { message: "Logged In Successfully" });
    }
    catch (error) {
        console.log("error :>> ", error);
        return cb({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Incorrect email or password entered",
        });
    }
})));
// JWT authentication strategy
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSecret_1.secretKey,
}, (jwtPayload, cb) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUserDetailsService_1.getUserDetailsService)({
        email: jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.email,
        userId: jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.userId,
        name: jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.name,
    });
    console.log("user :>> ", user);
    if (user)
        return cb(null, jwtPayload);
    return cb({ message: "Invalid JWT" });
})));
