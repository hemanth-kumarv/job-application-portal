import mongooseConnection from "../../../config/mongooseConnection";

export const softDeleteApplicationService = async (applicationId: string) => {
  const { Application } = await mongooseConnection;
  const updatedRow = await Application.findOneAndUpdate(
    { _id: applicationId },
    { isDeleted: true },
    { new: true }
  ).exec();
  return updatedRow;
};
