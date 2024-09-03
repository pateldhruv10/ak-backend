// NPM Imports
import Joi, { ObjectSchema } from "joi";

/**
 * Create Employee Schema
 */
export const createEmployeeSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role_id: Joi.number().required(),
  status: Joi.boolean(),
});


/**
 * Update Employee Schema
 */
export const updateEmployeeSchema: any = Joi.object({
  password: Joi.string(),
  status: Joi.boolean(),
  role_id: Joi.number().required()
});


