import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// NOTE: connect to express
const app = express();
const PORT = 5000;

// NOTE: middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }
  ));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

// NOTE: shows missing URI error
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env file");
  process.exit(1);
}

// NOTE: connect to mongoose 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // NOTE: connect to port
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log('MongoDB connected')
  })
  .catch(err => {
    console.error('MongoDB error:', err)
  });

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

// NOTE: routes
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
app.use('/auth', authRouter);
