import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';
import { ObjectId } from 'mongodb';

// NOTE: POST
export const addTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.body.productId)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Product.findOne({ _id: new ObjectId(req.body.productId) })) {
    res.status(500).json({ error: 'Product does not exist!' });
    return;
  }
  try {
    const productId = req.body.productId; //TODO: make this into a object
    const { orderQty, orderStatus, email, dateOrdered, time } = req.body;
    const newTransaction = new Transaction({ productId, orderQty, orderStatus, email, dateOrdered, time });
    await newTransaction.save();
    res.status(200).json({ message: "Transaction created successfully!" });
    return;
  } catch (err) {
    res.status(500).json({ error: "Error adding transaction!" });
    return;
  }
}

// NOTE: GET
// NOTE: (Int: 0 Pending / 1 Completed / 2 Canceled / 3 Cart)
export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsPending = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 0 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCompleted = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 1 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCancelled = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 2 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCart = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 3 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};




// NOTE: PUT
export const updateTransaction = async (req, res) => {
  const newTransaction = req.body;
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Transaction.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Transaction does not exist!' });
    return;
  }
  try {
    await Transaction.updateOne({ _id: Object(req.body.id) }, { $set: newTransaction });
    res.status(200).json({ message: "Updated transaction!" });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction' });
    return;
  }
};

// NOTE: DELETE
export const removeTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Transaction.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Transaction does not exist!' });
    return;
  }
  try {
    await Transaction.deleteOne({ _id: Object(req.body.id) });
    res.status(200).json({ message: "Deleted transaction!" });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
    return;
  }
};
