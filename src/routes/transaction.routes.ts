// NPM Imports
import { Router } from 'express';
import { createTransaction, deleteTransaction, listing } from '../controllers/transaction.controller';

// Initializations
const transactionRouter: Router = Router();

/**
 * Create Employee
 */
transactionRouter.post(
  '/create',
  [],
  createTransaction
);


transactionRouter.get(
  '/listing',
  [],
  listing
);


transactionRouter.delete(
  '/deleteTransaction',
  [],
  deleteTransaction
);

export default transactionRouter;
