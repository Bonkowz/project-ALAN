import express from 'express';
import { addTransaction, getAllTransactions, updateTransaction, removeTransaction, } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/add-transaction/:id', addTransaction);
transactionRouter.get('/get-all-transactions', getAllTransactions);
transactionRouter.patch('/update-transaction/:id', updateTransaction);
transactionRouter.delete('/remove-transaction/:id', removeTransaction);

export default transactionRouter;
