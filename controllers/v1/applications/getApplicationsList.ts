import { Request, Response } from "express";
import { formatStringQueries } from "../../../helpers/formatStringQueries";
import { getApplicationsListService } from "../../../service/v1/applications/getApplicationsListService";

export const getApplicationsList = async (req: Request, res: Response) => {
  try {
    const { page, size, ...queries } = req.query;
    const pageNumber = isNaN(Number(page)) ? -1 : Number(page);
    const pageLength = isNaN(Number(size)) ? 0 : Number(size);

    const formattedQueries = formatStringQueries(
      queries as { [key: string]: string },
      ["applicantName", "applicantEmail"],
      []
    );

    const { rows: applications, total } = await getApplicationsListService({
      page: pageNumber,
      size: pageLength,
      queries: formattedQueries,
    });

    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully retrieved applications list",
      data: applications,
      total,
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
