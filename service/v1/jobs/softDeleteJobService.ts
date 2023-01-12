import mongooseConnection from "../../../config/mongooseConnection";

export const softDeleteJobService = async (jobId: string) => {
  const { Job } = await mongooseConnection;
  const updatedRow = await Job.findOneAndUpdate(
    { _id: jobId },
    { isDeleted: true },
    { new: true }
  ).exec();
  return updatedRow;
};
