import { Router } from "express";
const router = Router();

import {
  addNewJob,
  getJobsList,
  editJob,
  softDeleteJob,
} from "../../controllers/v1/jobs/index";

// PUT
router.put("/id/:jobId", editJob);

// GET
router.get("/", getJobsList);

// POST
router.post("/", addNewJob);

// DELETE
router.delete("/id/:jobId", softDeleteJob);

export default router;
