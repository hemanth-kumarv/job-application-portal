import { Request, Response } from "express";
import { readFileContent } from "../../../helpers/readFileContent";
import { IJobApplicationsSchema } from "../../../models/JobApplicationsSchema";
import { addNewApplicationService } from "../../../service/v1/applications/addNewApplicationService";

export const addNewApplication = async (req: Request, res: Response) => {
  console.log("Incoming Request: addNewApplication :>>\n", req.body);
  const { applicantName, applicantEmail } = req.body as IJobApplicationsSchema;
  const { jobId } = req.params;
  const coverLetter = await readFileContent(req.file);

  try {
    const job = await addNewApplicationService({
      jobId,
      applicantName,
      applicantEmail,
      coverLetter,
    });
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully added new job application",
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
