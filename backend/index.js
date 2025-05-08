import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }
));

app.use(express.json());

// NOTE: shows missing URI error
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env file");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
