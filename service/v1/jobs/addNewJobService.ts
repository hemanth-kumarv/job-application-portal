import mongooseConnection from "../../../config/mongooseConnection";
import { IJobSchema } from "../../../models/JobSchema";

export const addNewJobService = async (data: IJobSchema) => {
  const { Job } = await mongooseConnection;
  const newRow = new Job(data);
  await newRow.save();
  return newRow;
};
