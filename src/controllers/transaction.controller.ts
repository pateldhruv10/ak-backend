//NPM Imports
import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
// import { Role, Transaction } from "../database/models";
import { Transaction } from '../database/models/transaction.model';
import mongoose from "mongoose";
import { Role } from "../database/models";

// MongoDB connection setup
mongoose.connect('mongodb://adminUser1:securePa6473926498ssword@127.0.0.1:27017/admin?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0', {
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

    // if(ac_type == 'full') {
    //   for(let i=1;i<=ac_number;i++) {
    //     const transaction = new Transaction({
    //       emp_id: user?.id, 
    //       ac_number: i,
    //       ac_type,
    //       amount,
    //     });
    //     let savedTransaction = await transaction.save();
    //   }
    // } else {
    //   let start: number = parseInt(ac_number) + 1
    //   for(let i=start;i<=10;i++) {
    //     console.log('I => ', i)
    //     const transaction = new Transaction({
    //       emp_id: user?.id, 
    //       ac_number: i,
    //       ac_type,
    //       amount,
    //     });
    //     let savedTransaction = await transaction.save();
    //   }
    // }
   
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


export async function listing1(req: Request, res: Response) {
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
      const groupedData: any = {};
      transactions.forEach(transaction => {
          const { emp_id, ac_number, amount } = transaction;
          if (!groupedData[emp_id]) {
              groupedData[emp_id] = {};
              for (let i = 1; i <= 10; i++) {
                  groupedData[emp_id][i] = { total: 0 };
              }
          }
          if (ac_number && groupedData[emp_id][ac_number] !== undefined) {
              groupedData[emp_id][ac_number].total += amount;
          }
      });

      return res.status(HttpStatusCodes.OK).json({
        message: "Success",
        data: groupedData,
      });
    } else {
      const transactions = await Transaction.find({ emp_id: user?.id });
      const acNumberTotals: any = {};

      for (let i = 1; i <= 10; i++) {
          acNumberTotals[i] = { total: 0 };
      }
  
      transactions.forEach(transaction => {
          if (transaction.ac_number && acNumberTotals[transaction.ac_number] !== undefined) {
              acNumberTotals[transaction.ac_number].total += transaction.amount;
          }
      });

      return res.status(HttpStatusCodes.OK).json({
        message: "Success",
        data: acNumberTotals,
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
