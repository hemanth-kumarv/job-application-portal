import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { loginUserService } from "../service/v1/users/loginUserService";
import { secretKey } from "./JWTSecret";
import { getUserDetailsService } from "../service/v1/users/getUserDetailsService";

// Login strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, cb) => {
      try {
        const user = await loginUserService({ email, password });
        return cb(null, user, { message: "Logged In Successfully" });
      } catch (error) {
        console.log("error :>> ", error);
        return cb({
          message:
            (error as Error)?.message || "Incorrect email or password entered",
        });
      }
    }
  )
);

// JWT authentication strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Reading Auth bearer token from header
      secretOrKey: secretKey,
    },
    async (jwtPayload, cb) => {
      const user = await getUserDetailsService({
        email: jwtPayload?.email,
        userId: jwtPayload?.userId,
        name: jwtPayload?.name,
      });
      console.log("user :>> ", user);
      if (user) return cb(null, jwtPayload);
      return cb({ message: "Invalid JWT" });
    }
  )
);
