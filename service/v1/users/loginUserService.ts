import mongooseConnection from "../../../config/mongooseConnection";
import bcrypt from "bcrypt";
import { IUsersSchema } from "../../../models/UsersSchema";

export const loginUserService = (data: IUsersSchema) =>
  new Promise<IUsersSchema>(async (resolve, reject) => {
    const { Users } = await mongooseConnection;

    const user = await Users.findOne({ email: data.email }).exec();
    if (user?.password) {
      const isPasswordMatching = await bcrypt.compare(
        data.password!,
        user?.password
      );
      if (isPasswordMatching) return resolve(user);
      return reject({ message: "Incorrect email or password entered" }); // User does not exist
    }
    return reject({ message: "Incorrect email or password entered" }); // User does not exist
  });
