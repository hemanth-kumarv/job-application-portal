import { Request, Response } from "express";
import { IJobSchema } from "../../../models/JobSchema";
import { addNewJobService } from "../../../service/v1/jobs/addNewJobService";

export const addNewJob = async (req: Request, res: Response) => {
  console.log("Incoming Request: addNewJob :>>\n", req.body);
  const { title, description, userId, skills, experience } =
    req.body as IJobSchema;

  try {
    const job = await addNewJobService({
      title,
      description,
      userId,
      skills,
      experience,
    });
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully added new job",
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
