import { Request, Response } from "express";
import { readFileContent } from "../../../helpers/readFileContent";
import { IJobApplicationsSchema } from "../../../models/JobApplicationsSchema";
import { editApplicationService } from "../../../service/v1/applications/editApplicationService";

export const editApplication = async (req: Request, res: Response) => {
  console.log("Incoming Request: editApplication :>>\n", req.body);
  const { jobId, applicantName, applicantEmail } =
    req.body as IJobApplicationsSchema;
  const { applicationId } = req.params;
  const coverLetter = await readFileContent(req.file);

  try {
    const job = await editApplicationService(applicationId, {
      jobId,
      applicantName,
      applicantEmail,
      coverLetter,
    });
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully edited job application",
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
