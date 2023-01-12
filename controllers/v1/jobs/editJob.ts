import { Request, Response } from "express";
import { IJobSchema } from "../../../models/JobSchema";
import { editJobService } from "../../../service/v1/jobs/editJobService";

export const editJob = async (req: Request, res: Response) => {
  console.log("Incoming Request: editJob :>>\n", req.body);
  const { title, description, userId, skills, experience } =
    req.body as IJobSchema;

  const { jobId } = req.params;

  try {
    const job = await editJobService(jobId, {
      title,
      description,
      userId,
      skills,
      experience,
    });
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
