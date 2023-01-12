"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = require("../../controllers/v1/applications/index");
const uploader = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});
// PUT
router.put("/id/:applicationId", uploader.single("coverLetter"), index_1.editApplication);
// GET
router.get("/id/:applicationId/cover-letter/", index_1.getCoverLetterOfApplication);
router.get("/", index_1.getApplicationsList);
// POST
router.post("/job/id/:jobId", uploader.single("coverLetter"), index_1.addNewApplication);
// DELETE
router.delete("/id/:applicationId", index_1.softDeleteApplication);
exports.default = router;
