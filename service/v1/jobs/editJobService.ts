import mongooseConnection from "../../../config/mongooseConnection";
import { IJobSchema } from "../../../models/JobSchema";

export const editJobService = async (jobId: string, data: IJobSchema) => {
  const { Job } = await mongooseConnection;
  const updatedRow = await Job.findOneAndUpdate({ _id: jobId }, data, {
    new: true,
  }).exec();
  return updatedRow;
};
