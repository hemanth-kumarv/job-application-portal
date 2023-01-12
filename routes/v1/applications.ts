import multer from "multer";
import { Router } from "express";
const router = Router();

import {
  addNewApplication,
  getApplicationsList,
  getCoverLetterOfApplication,
  editApplication,
  softDeleteApplication,
} from "../../controllers/v1/applications/index";

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

// PUT
router.put(
  "/id/:applicationId",
  uploader.single("coverLetter"),
  editApplication
);

// GET
router.get("/id/:applicationId/cover-letter/", getCoverLetterOfApplication);
router.get("/", getApplicationsList);

// POST
router.post(
  "/job/id/:jobId",
  uploader.single("coverLetter"),
  addNewApplication
);

// DELETE
router.delete("/id/:applicationId", softDeleteApplication);

export default router;
