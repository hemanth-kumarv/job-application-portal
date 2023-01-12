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
exports.addUser = void 0;
const addUserService_1 = require("../../../service/v1/users/addUserService");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming Request: addUser :>>\n", req.body);
    const { name, email, password } = req.body;
    try {
        const user = yield (0, addUserService_1.addUserService)({ name, email, password });
        return res.status(200).json({
            statusCode: 200,
            isSuccess: true,
            message: "Successfully added new user",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            statusCode: 500,
            isSuccess: false,
            message: error === null || error === void 0 ? void 0 : error.message,
            data: null,
        });
    }
});
exports.addUser = addUser;
