"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = require("../../controllers/v1/jobs/index");
// PUT
router.put("/id/:jobId", index_1.editJob);
// GET
router.get("/", index_1.getJobsList);
// POST
router.post("/", index_1.addNewJob);
// DELETE
router.delete("/id/:jobId", index_1.softDeleteJob);
exports.default = router;
