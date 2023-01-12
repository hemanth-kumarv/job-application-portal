import mongooseConnection from "../../../config/mongooseConnection";
import { IGetReqParams } from "../../../types/IGetReqParams";

export const getJobsListService = async ({
  page = -1,
  size = 0,
  queries,
}: IGetReqParams) => {
  const { Job } = await mongooseConnection;
  const formattedQueries = Object.keys(queries).map((query) => {
    if (query == "skills") return { [query]: { $in: queries[query] } };
    return {
      [query]: { $regex: new RegExp(queries[query] as string, "i") },
    };
  });

  const skipCount = page * size;

  const rows = await Job.aggregate([
    { $match: { isDeleted: false } },
    ...(formattedQueries.length
      ? [{ $match: { $and: formattedQueries } }]
      : []),
    ...(skipCount ? [{ $skip: skipCount }] : []),
    ...(size ? [{ $limit: size }] : []),
    {
      $lookup: {
        from: "applications",
        localField: "_id",
        foreignField: "jobId",
        as: "applications",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $project: { "user.password": 0 } },
  ]).exec();
  const total = await Job.find(
    formattedQueries.length ? { $and: formattedQueries } : {}
  )
    .count()
    .exec();

  return { rows, total };
};
