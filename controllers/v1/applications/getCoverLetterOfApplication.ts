import { Request, Response } from "express";
import { getCoverLetterOfApplicationService } from "../../../service/v1/applications/getCoverLetterOfApplicationService";

export const getCoverLetterOfApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { applicationId } = req?.params;

    const coverLetter = await getCoverLetterOfApplicationService(applicationId);

    return res.send(coverLetter);
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      statusCode: 500,
      isSuccess: false,
      message: (error as Error)?.message,
      data: null,
    });
  }
};
