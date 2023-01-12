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
exports.getCoverLetterOfApplication = void 0;
const getCoverLetterOfApplicationService_1 = require("../../../service/v1/applications/getCoverLetterOfApplicationService");
const getCoverLetterOfApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req === null || req === void 0 ? void 0 : req.params;
        const coverLetter = yield (0, getCoverLetterOfApplicationService_1.getCoverLetterOfApplicationService)(applicationId);
        return res.send(coverLetter);
    }
    catch (error) {
        console.log("error :>> ", error);
        return res.status(500).json({
            statusCode: 500,
            isSuccess: false,
            message: error === null || error === void 0 ? void 0 : error.message,
            data: null,
        });
    }
});
exports.getCoverLetterOfApplication = getCoverLetterOfApplication;
