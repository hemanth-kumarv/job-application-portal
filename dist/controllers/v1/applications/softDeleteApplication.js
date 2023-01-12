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
exports.softDeleteApplication = void 0;
const softDeleteApplicationService_1 = require("../../../service/v1/applications/softDeleteApplicationService");
const softDeleteApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming Request: softDeleteApplication :>>\n", req.body);
    const { applicationId } = req.params;
    try {
        const job = yield (0, softDeleteApplicationService_1.softDeleteApplicationService)(applicationId);
        return res.status(200).json({
            statusCode: 200,
            isSuccess: true,
            message: "Successfully deleted job application",
            data: job,
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
exports.softDeleteApplication = softDeleteApplication;
