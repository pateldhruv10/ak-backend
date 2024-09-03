// NPM Imports
import { Router } from 'express';

// Middlewares Imports
import validateRequestBody from '../middlewares/request-body-validation.middleware';



// Controller Functions Imports
import {
  index, show, create, deleteEmployee, update,
  listing,
  
} from '../controllers/employee.controller';
import { createEmployeeSchema, updateEmployeeSchema } from '../validations/employee.validation';

// Initializations
const adminEmployeeRouter: Router = Router();


/**
 * Listing Employee
 */
adminEmployeeRouter.get(
  '/listing',
  [],
  index
);

/**
 * Listing Employee
 */
adminEmployeeRouter.get(
  '/master/listing',
  [],
  listing
);

/**
 * Create Employee
 */
adminEmployeeRouter.post(
  '/create',
  [validateRequestBody(createEmployeeSchema)],
  create
);


/**
 * Update Employee
 */
adminEmployeeRouter.put(
  '/update/:id',
  [
    validateRequestBody(updateEmployeeSchema),
  ],
  update
);

/**
 * Detail Employee
 */
adminEmployeeRouter.get(
  '/:id',
  [],
  show
);

/**
 * Delete Employee
 */
adminEmployeeRouter.delete(
  '/:id',
  [],
  deleteEmployee
);


export default adminEmployeeRouter;
