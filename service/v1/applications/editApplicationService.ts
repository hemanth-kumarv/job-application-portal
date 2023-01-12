import mongooseConnection from "../../../config/mongooseConnection";
import { IJobApplicationsSchema } from "../../../models/JobApplicationsSchema";

export const editApplicationService = async (
  applicationId: string,
  data: IJobApplicationsSchema
) => {
  const { Application } = await mongooseConnection;
  const updatedRow = await Application.findOneAndUpdate(
    { _id: applicationId },
    data,
    { new: true }
  ).exec();
  return updatedRow;
};
