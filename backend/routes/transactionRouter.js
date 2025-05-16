import express from 'express';
import { 
    addTransaction, 
    getAllTransactions, 
    getAllTransactionsPending, 
    getAllTransactionsCompleted, 
    getAllTransactionsCancelled, 
    getAllTransactionsCart,
    updateTransaction, 
    removeTransaction, 
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/add-transaction', addTransaction);
transactionRouter.get('/get-all-transactions', getAllTransactions);
transactionRouter.get('/get-all-transactions-pending', getAllTransactionsPending);
transactionRouter.get('/get-all-transactions-completed', getAllTransactionsCompleted);
transactionRouter.get('/get-all-transactions-cancelled', getAllTransactionsCancelled);
transactionRouter.get('/get-all-transactions-cart', getAllTransactionsCart);
transactionRouter.patch('/update-transaction', updateTransaction);
transactionRouter.delete('/remove-transaction', removeTransaction);

export default transactionRouter;
