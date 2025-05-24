import express from 'express';
import {addUser, getAllUsers, getAllCustomers, updateUser, removeUser, getCustomerTransactions} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/add-user', addUser);
userRouter.get('/get-all-users', getAllUsers);
userRouter.get('/get-all-customers', getAllCustomers);
userRouter.patch('/update-user', updateUser);
userRouter.delete('/remove-user', removeUser);
userRouter.get("/get-customer-transactions", getCustomerTransactions);

export default userRouter;
