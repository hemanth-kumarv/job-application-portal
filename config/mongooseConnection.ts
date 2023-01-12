import mongoose from "mongoose";
import {
  IJobApplicationsSchema,
  JobApplicationsSchema,
} from "../models/JobApplicationsSchema";
import { IJobSchema, JobSchema } from "../models/JobSchema";
import { IUsersSchema, UsersSchema } from "../models/UsersSchema";

export interface IMongoSchemas {
  Job: mongoose.Model<IJobSchema>;
  Application: mongoose.Model<IJobApplicationsSchema>;
  Users: mongoose.Model<IUsersSchema>;
}

export default new Promise<IMongoSchemas>(async (resolve, reject) => {
  try {
    const connectionURI =
      process.env.CONNECTION_URI || "mongodb://127.0.0.1:27017/XShipment";
    await mongoose.connect(connectionURI);

    mongoose.set("setDefaultsOnInsert", true);
    const Job = mongoose.model<IJobSchema>("jobs", JobSchema);
    const Application = mongoose.model<IJobApplicationsSchema>(
      "applications",
      JobApplicationsSchema
    );
    const Users = mongoose.model<IUsersSchema>("users", UsersSchema);

    resolve({ Job, Application, Users });
  } catch (error) {
    console.log("error :>> ", error);
    reject(error);
  }
});
