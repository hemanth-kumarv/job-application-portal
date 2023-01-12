import mongooseConnection from "../../../config/mongooseConnection";
import { IGetReqParams } from "../../../types/IGetReqParams";

export const getApplicationsListService = async ({
  page = -1,
  size = 0,
  queries,
}: IGetReqParams) => {
  const { Application } = await mongooseConnection;

  const formattedQueries = Object.keys(queries).map((query) => ({
    [query]: { $regex: new RegExp(queries[query] as string, "i") },
  }));

  const skipCount = page * size;
  const rows = await Application.aggregate([
    { $match: { isDeleted: false } },
    ...(formattedQueries.length
      ? [{ $match: { $and: formattedQueries } }]
      : []),
    ...(skipCount ? [{ $skip: skipCount }] : []),
    ...(size ? [{ $limit: size }] : []),
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "job.userId",
        foreignField: "_id",
        as: "job.user",
      },
    },
    { $project: { "job.user.password": 0 } },
  ]).exec();
  const total = await Application.find(
    formattedQueries.length ? { $and: formattedQueries } : {}
  )
    .count()
    .exec();

  return { rows, total };
};
