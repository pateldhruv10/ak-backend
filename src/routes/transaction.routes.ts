// NPM Imports
import { Router } from 'express';
import { createTransaction, deleteTransaction, deleteTransactionByNumberAndID, getTransactionListingByNumber, listing } from '../controllers/transaction.controller';

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

transactionRouter.get(
  '/listing/number',
  [],
  getTransactionListingByNumber
);

transactionRouter.delete(
  '/delete/:id/:number',
  [],
  deleteTransactionByNumberAndID
);



transactionRouter.delete(
  '/deleteTransaction',
  [],
  deleteTransaction
);

export default transactionRouter;
