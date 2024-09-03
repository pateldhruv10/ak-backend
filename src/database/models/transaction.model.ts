import mongoose from 'mongoose';

const { Schema } = mongoose;

const Transactions = new Schema(
  {
    emp_id: {
      type: Number,
      required: true,
    },
    ac_number: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: false,
    },
    percentage_amount: {
      type: Number,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }, // Only track created_at
  }
);

const Transaction = mongoose.model('Transaction', Transactions);

export { Transaction };
