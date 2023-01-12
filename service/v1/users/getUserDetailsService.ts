import mongooseConnection from "../../../config/mongooseConnection";
import { IUsersSchema } from "../../../models/UsersSchema";

export const getUserDetailsService = async (data: IUsersSchema | void) => {
  const { Users } = await mongooseConnection;

  const query = Object.assign(
    {},
    { isDeleted: false },
    data?.email ? { email: data?.email } : null,
    data?.userId ? { _id: data?.userId } : null,
    data?.name ? { name: data?.name } : null
  );
  const user = await Users.findOne(query).exec();
  return user;
};
