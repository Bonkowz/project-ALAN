import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routes/products.js';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

app.use('/api/products', productRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
