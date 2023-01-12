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
const mongoose_1 = __importDefault(require("mongoose"));
const JobApplicationsSchema_1 = require("../models/JobApplicationsSchema");
const JobSchema_1 = require("../models/JobSchema");
const UsersSchema_1 = require("../models/UsersSchema");
exports.default = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectionURI = process.env.CONNECTION_URI || "mongodb://127.0.0.1:27017/XShipment";
        yield mongoose_1.default.connect(connectionURI);
        mongoose_1.default.set("setDefaultsOnInsert", true);
        const Job = mongoose_1.default.model("jobs", JobSchema_1.JobSchema);
        const Application = mongoose_1.default.model("applications", JobApplicationsSchema_1.JobApplicationsSchema);
        const Users = mongoose_1.default.model("users", UsersSchema_1.UsersSchema);
        resolve({ Job, Application, Users });
    }
    catch (error) {
        console.log("error :>> ", error);
        reject(error);
    }
}));
