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
exports.editJob = void 0;
const editJobService_1 = require("../../../service/v1/jobs/editJobService");
const editJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming Request: editJob :>>\n", req.body);
    const { title, description, userId, skills, experience } = req.body;
    const { jobId } = req.params;
    try {
        const job = yield (0, editJobService_1.editJobService)(jobId, {
            title,
            description,
            userId,
            skills,
            experience,
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccess: true,
            message: "Successfully edited job details",
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
exports.editJob = editJob;
