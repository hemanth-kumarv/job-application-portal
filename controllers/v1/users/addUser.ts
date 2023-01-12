import { Request, Response } from "express";
import { IUsersSchema } from "../../../models/UsersSchema";
import { addUserService } from "../../../service/v1/users/addUserService";

export const addUser = async (req: Request, res: Response) => {
  console.log("Incoming Request: addUser :>>\n", req.body);
  const { name, email, password } = req.body as IUsersSchema;

  try {
    const user = await addUserService({ name, email, password });
    return res.status(200).json({
      statusCode: 200,
      isSuccess: true,
      message: "Successfully added new user",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      isSuccess: false,
      message: (error as Error)?.message,
      data: null,
    });
  }
};
