import mongooseConnection from "../../../config/mongooseConnection";
import markdown from "markdown-it";

export const getCoverLetterOfApplicationService = async (
  applicationId: string
) => {
  const md = new markdown({ html: true, xhtmlOut: true, breaks: true });
  const { Application } = await mongooseConnection;
  const row = await Application.findOne({ _id: applicationId }).exec();
  if (row?.coverLetter) {
    const coverLetter = md.render(row?.coverLetter);
    return coverLetter;
  }
  return null;
};
