// NPM Imports
import { Router } from 'express';
import { index } from '../controllers/role.controller';

// Initializations
const roleRouter: Router = Router();

/**
 * Listing Role
 */
roleRouter.get(
  '/listing',
  [],
  index
);



export default roleRouter;
