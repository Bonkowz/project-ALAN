import Transaction from '../models/Transaction.js';
import { ObjectId } from 'mongodb';

// NOTE: POST
export const addTransaction = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      const productId = req.params.id;
      const {orderQty, orderStatus, email, dateOrdered, time} = req.body;
      const newTransaction = new Transaction({productId, orderQty, orderStatus, email, dateOrdered, time});
      await newTransaction.save();
      res.status(200).json({message:"Transaction created successfully!"});
    } catch (err) {
      res.status(500).json({error: "Error adding transaction!"});
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
}

// NOTE: GET
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// NOTE: PUT
export const updateTransaction = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      const newTransaction = req.body;
      await Transaction.updateOne({_id: Object(req.params.id)}, {$set: newTransaction});
      res.status(200).json({message: "Updated transaction!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};

// NOTE: DELETE
export const removeTransaction = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      await Transaction.deleteOne({_id: Object(req.params.id)});
      res.status(200).json({ message: "Deleted transaction!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};

