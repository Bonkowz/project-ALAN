import express from 'express';
import {addUser, getAllUsers, updateUser, removeUser,} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/add-user', addUser);
userRouter.get('/get-all-users', getAllUsers);
userRouter.patch('/update-user/:id', updateUser);
userRouter.delete('/remove-user/:id', removeUser);

export default userRouter;
