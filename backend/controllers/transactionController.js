import transactionSchema from '../models/Transaction.js';

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionSchema.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
