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
exports.getUserDetailsService = void 0;
const mongooseConnection_1 = __importDefault(require("../../../config/mongooseConnection"));
const getUserDetailsService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { Users } = yield mongooseConnection_1.default;
    const query = Object.assign({}, { isDeleted: false }, (data === null || data === void 0 ? void 0 : data.email) ? { email: data === null || data === void 0 ? void 0 : data.email } : null, (data === null || data === void 0 ? void 0 : data.userId) ? { _id: data === null || data === void 0 ? void 0 : data.userId } : null, (data === null || data === void 0 ? void 0 : data.name) ? { name: data === null || data === void 0 ? void 0 : data.name } : null);
    const user = yield Users.findOne(query).exec();
    return user;
});
exports.getUserDetailsService = getUserDetailsService;
