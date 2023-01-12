import { Request, Response } from "express";
import { IJobSchema } from "../../../models/JobSchema";
import { softDeleteJobService } from "../../../service/v1/jobs/softDeleteJobService";

export const softDeleteJob = async (req: Request, res: Response) => {
  console.log("Incoming Request: softDeleteJob :>>\n", req.body);
  const { jobId } = req.params;

  try {
    const job = await softDeleteJobService(jobId);
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully edited job details",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      isSuccess: false,
      message: (error as Error)?.message,
      data: null,
    });
  }
};
