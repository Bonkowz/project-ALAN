import express from 'express';
import {register, login, getProfile, registerAdmin, logout} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/registerAdmin', registerAdmin);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/profile', getProfile);

export default authRouter;

