// NPM Imports
import Joi, { ObjectSchema } from "joi";

///------------------------------|| AUTH REQUESTS BODY VALIDATION SCHEMAS ||------------------------------///

// LOGIN SCHEMA
export const loginSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// VALIDATE TOKEN SCHEMA
export const validateTokenSchema: any = Joi.object({
  token: Joi.string().required(),
});
