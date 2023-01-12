import mongooseConnection from "../../../config/mongooseConnection";
import { IJobApplicationsSchema } from "../../../models/JobApplicationsSchema";

export const addNewApplicationService = async (
  data: IJobApplicationsSchema
) => {
  const { Application } = await mongooseConnection;
  const newRow = new Application(data);
  await newRow.save();
  return newRow;
};
