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
exports.getCoverLetterOfApplicationService = void 0;
const mongooseConnection_1 = __importDefault(require("../../../config/mongooseConnection"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const getCoverLetterOfApplicationService = (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    const md = new markdown_it_1.default({ html: true, xhtmlOut: true, breaks: true });
    const { Application } = yield mongooseConnection_1.default;
    const row = yield Application.findOne({ _id: applicationId }).exec();
    if (row === null || row === void 0 ? void 0 : row.coverLetter) {
        const coverLetter = md.render(row === null || row === void 0 ? void 0 : row.coverLetter);
        return coverLetter;
    }
    return null;
});
exports.getCoverLetterOfApplicationService = getCoverLetterOfApplicationService;
