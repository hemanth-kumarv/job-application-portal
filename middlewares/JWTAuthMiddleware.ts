import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/JWTSecret";

// Middleware to authenticate JWT token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        statusCode: 401,
        isSuccess: false,
        message: err?.message || "User JWT unauthorized",
        data: user,
      });
    }
    // console.log("Valid JWT for ", user);
    next();
  })(req, res, next);
};

// Middleware to login user and sign JWT token
export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false, failureMessage: true },
    (err, user, info) => {
      if (err || !user) {
        console.log("err :>> ", err, user, info);
        return res.status(400).json({
          statusCode: 400,
          isSuccess: false,
          message: err?.message || "Could not login user",
          data: user,
        });
      }
      const token = jwt.sign(
        { email: user.email, name: user.name, userId: user._id },
        secretKey
      );
      res.header("Authorization", "Bearer " + token);
      return res.json({
        statusCode: 200,
        isSuccess: true,
        message: "Successfully logged user in",
        data: user,
      });
    }
  )(req, res);
};
