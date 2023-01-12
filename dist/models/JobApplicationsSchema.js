"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.JobApplicationsSchema = new Schema({
    jobId: mongoose_1.default.Types.ObjectId,
    applicantName: String,
    applicantEmail: String,
    coverLetter: String,
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
