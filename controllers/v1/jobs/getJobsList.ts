import { Request, Response } from "express";
import { formatStringQueries } from "../../../helpers/formatStringQueries";
import { getJobsListService } from "../../../service/v1/jobs/getJobsListService";

export const getJobsList = async (req: Request, res: Response) => {
  try {
    const { page, size, ...queries } = req.query;
    const pageNumber = isNaN(Number(page)) ? -1 : Number(page);
    const pageLength = isNaN(Number(size)) ? 0 : Number(size);

    const formattedQueries = formatStringQueries(
      queries as { [key: string]: string },
      ["title", "description"],
      ["skills"]
    );

    const { rows: jobs, total } = await getJobsListService({
      page: pageNumber,
      size: pageLength,
      queries: formattedQueries,
    });

    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully retrieved jobs list",
      data: jobs,
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
