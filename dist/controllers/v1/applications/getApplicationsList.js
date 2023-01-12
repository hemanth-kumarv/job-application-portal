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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationsList = void 0;
const formatStringQueries_1 = require("../../../helpers/formatStringQueries");
const getApplicationsListService_1 = require("../../../service/v1/applications/getApplicationsListService");
const getApplicationsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page, size } = _a, queries = __rest(_a, ["page", "size"]);
        const pageNumber = isNaN(Number(page)) ? -1 : Number(page);
        const pageLength = isNaN(Number(size)) ? 0 : Number(size);
        const formattedQueries = (0, formatStringQueries_1.formatStringQueries)(queries, ["applicantName", "applicantEmail"], []);
        const { rows: applications, total } = yield (0, getApplicationsListService_1.getApplicationsListService)({
            page: pageNumber,
            size: pageLength,
            queries: formattedQueries,
        });
        return res.status(200).json({
            statusCode: 200,
            isSuccess: true,
            message: "Successfully retrieved applications list",
            data: applications,
            total,
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
exports.getApplicationsList = getApplicationsList;
