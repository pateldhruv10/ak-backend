// NPM Imports
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";
import Joi from "joi";

///------------------------------|| REQUEST BODY VALIDATION MIDDLEWARE ||------------------------------///

const validateRequestBody = (schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Request Body => ',req?.body)
    const { error } = schema.validate(req?.body, { abortEarly: false });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const details = error.details.map((detail) =>
        detail.message.replace(/"/g, ""),
      );
      const message = details.join(", ");

      console.warn("Middleware(Request Body Validation) Error:", message);
      res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json({ message });
    }
  };
};

export default validateRequestBody;
