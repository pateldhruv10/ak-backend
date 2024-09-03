// NPM Imports
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import passport from "passport";

///------------------------------|| AUTHENTICATION CHECK MIDDLEWARE ||------------------------------///

const checkAuthentication = (): ((
  req: Request,
  res: Response,
  next: NextFunction,
) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.user)
    passport.authenticate(
      "jwt",
      { session: false },
      (error: Error, employee: any | null) => {
        if (error) {
          return next(error);
        }

        if (!employee) {
          console.warn(
            "Middleware(Authentication Check) Error: Unauthenticated",
          );
          return res
            .status(HttpStatusCodes.UNAUTHORIZED)
            .json({ message: "Unauthorized" });
        }

        console.log("Employee => ", employee)
        req.user = employee;
        next();
      },
    )(req, res, next);
  };
};

export default checkAuthentication;
