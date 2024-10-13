//NPM Imports
import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
// import { Role, Transaction } from "../database/models";
import { Transaction } from '../database/models/transaction.model';
import mongoose from 'mongoose'; // Make sure mongoose is imported
import { Role } from "../database/models";

// MongoDB connection setup
// mongoose.connect('mongodb://adminUser1:securePa6473926498ssword@127.0.0.1:27017/admin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as any);

mongoose.connect('mongodb://adminUser1:securePa6473926498ssword@18.181.221.136:27017/admin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);




// mongoose.connect('mongodb+srv://akinfotech:AK%40infotech365@akinfotech.btzd1oz.mongodb.net/akinfotech', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as any);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

export async function createTransaction(req: Request, res: Response) {
  try {
    const { ac_number, amount, per } = req.body;
    const user: any = req.user


    // Validate input
    if (!amount || !ac_number || !per) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    let percentage_amount = (amount * per) / 100;

    const transaction = new Transaction({
      emp_id: user?.id, 
      ac_number: ac_number,
      amount: amount,     
      percentage: per,
      percentage_amount,
    });
    await transaction.save();
   
    return res.status(HttpStatusCodes.OK).json({
      message: "Success",
      data: [],
    });
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

/**
 * Transaction Listing
 * @param req 
 * @param res 
 * @returns 
 */
export async function listing(req: Request, res: Response) {
  try {
    const user: any = req.user

    if(!user) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'User Not Found',
      });
    }

    const roleInfo: any = await Role.findByPk(user?.role_id);

    if(!roleInfo) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Role Not Found',
      });
    }


    if(roleInfo?.role_key == 'super_admin') {
      const transactions = await Transaction.find();

      return res.status(HttpStatusCodes.OK).json({
        message: "Success",
        data: transactions,
      });
    } else {
      const transactions = await Transaction.find({ emp_id: user?.id });

      return res.status(HttpStatusCodes.OK).json({
        message: "Success",
        data: transactions,
      });
    }
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}


/**
 * Delete Transaction
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteTransaction(req: Request, res: Response) {
  try {
    const user: any = req.user

    if(!user) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'User Not Found',
      });
    }

    const roleInfo: any = await Role.findByPk(user?.role_id);

    if(!roleInfo) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Role Not Found',
      });
    }


    if(roleInfo?.role_key == 'super_admin') {
      const result = await Transaction.deleteMany({});
      if (result.deletedCount === 0) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: 'No Transaction Found to delete',
        });
      }
      return res.status(HttpStatusCodes.OK).json({
        message: "All transaction has been deleted successfully",
      });
    }  else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: 'You do not have rights to delete all the data',
      });
    }
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

/**
 * Get Transaction Listing By Number
 * @param req 
 * @param res 
 * @returns 
 */
export async function getTransactionListingByNumber(req: Request, res: Response) {
  try {
    const user: any = req.user
    const body: any = req.query;

    if(!user) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'User Not Found',
      });
    }

    const roleInfo: any = await Role.findByPk(user?.role_id);

    if(!roleInfo) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Role Not Found',
      });
    }

    console.log('AC Number ',body?.number)
 
    const transactions = await Transaction.find({ emp_id: user?.id, ac_number: body?.number });
    return res.status(HttpStatusCodes.OK).json({
      message: "Success",
      data: transactions,
    });
   
  } catch (error) {
    console.error("Controller Error (Index Function):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}


/**
 * Delete Transaction by Number & User ID
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteTransactionByNumberAndID(req: Request, res: Response) {
  try {
    const user: any = req.user;
    const { id, number } = req.params;

    if (!user) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'User Not Found',
      });
    }

    const roleInfo: any = await Role.findByPk(user?.role_id);

    if (!roleInfo) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Role Not Found',
      });
    }

    // Convert id to ObjectId using 'new'
    const objectId = new mongoose.Types.ObjectId(id);

    // Check if the document exists with just the _id
    const transactionById = await Transaction.findOne({ _id: objectId });
    if (!transactionById) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Transaction not found with this ID',
      });
    }

    console.log(transactionById?.ac_number)
    const acNumber: any = transactionById.ac_number;

    if (acNumber == number && user?.id == transactionById?.emp_id) {
      const result = await Transaction.deleteOne({
        _id: objectId
      });

      if (result.deletedCount === 0) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: 'No Transaction Found for the specified criteria to delete',
        });
      } else {
        return res.status(HttpStatusCodes.OK).json({
          message: "Transaction deleted successfully",
        });
      }
    } else {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'No Transaction Found for the specified criteria to delete',
      });
    }

  } catch (error: any) {
    console.error("Controller Error (deleteTransactionByNumberAndID):", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

