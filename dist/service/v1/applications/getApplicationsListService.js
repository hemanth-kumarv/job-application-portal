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
exports.getApplicationsListService = void 0;
const mongooseConnection_1 = __importDefault(require("../../../config/mongooseConnection"));
const getApplicationsListService = ({ page = -1, size = 0, queries, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { Application } = yield mongooseConnection_1.default;
    const formattedQueries = Object.keys(queries).map((query) => ({
        [query]: { $regex: new RegExp(queries[query], "i") },
    }));
    const skipCount = page * size;
    const rows = yield Application.aggregate([
        { $match: { isDeleted: false } },
        ...(formattedQueries.length
            ? [{ $match: { $and: formattedQueries } }]
            : []),
        ...(skipCount ? [{ $skip: skipCount }] : []),
        ...(size ? [{ $limit: size }] : []),
        {
            $lookup: {
                from: "jobs",
                localField: "jobId",
                foreignField: "_id",
                as: "job",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "job.userId",
                foreignField: "_id",
                as: "job.user",
            },
        },
        { $project: { "job.user.password": 0 } },
    ]).exec();
    const total = yield Application.find(formattedQueries.length ? { $and: formattedQueries } : {})
        .count()
        .exec();
    return { rows, total };
});
exports.getApplicationsListService = getApplicationsListService;
