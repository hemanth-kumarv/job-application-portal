import mongooseConnection from "../../../config/mongooseConnection";
import { IUsersSchema } from "../../../models/UsersSchema";
import bcrypt from "bcrypt";

export const addUserService = async (data: IUsersSchema) => {
  const { Users } = await mongooseConnection;

  const passwordHash = await bcrypt.hash(data?.password!, 10);
  const newRow = new Users({ ...data, password: passwordHash });
  await newRow.save();
  return newRow;
};
