import { Request, Response } from "express";
import { softDeleteApplicationService } from "../../../service/v1/applications/softDeleteApplicationService";

export const softDeleteApplication = async (req: Request, res: Response) => {
  console.log("Incoming Request: softDeleteApplication :>>\n", req.body);
  const { applicationId } = req.params;

  try {
    const job = await softDeleteApplicationService(applicationId);
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully deleted job application",
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
