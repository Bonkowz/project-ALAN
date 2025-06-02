// api/index.js or api/[...path].js (recommended for handling all Express routes)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from '../routes/productRouter.js'; // Adjust paths as needed
import transactionRouter from '../routes/transactionRouter.js';
import userRouter from '../routes/userRouter.js';
import authRouter from '../routes/authRouter.js';
import cookieParser from 'cookie-parser';

// Load environment variables *before* any other code might use them
dotenv.config();

// Create the Express app instance
const app = express();

// NOTE: middleware (apply CORS, JSON parsing, etc.)
// Make sure CORS is configured for your frontend's domain(s)
app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend Vercel URL
  credentials: true // Important for cookies/sessions
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// NOTE: connect to mongoose - this connection should persist across invocations
// Vercel functions are "warm" for a while, so connection might reuse
let isConnected = false; // Flag to prevent multiple connections

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in Vercel Environment Variables");
    // In a serverless function, you might not want to process.exit(1)
    // Instead, you'd return an error response
    throw new Error("MongoDB URI is not defined.");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // No longer necessary in recent Mongoose versions
      // useUnifiedTopology: true, // No longer necessary
    });
    isConnected = true;
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    isConnected = false; // Ensure flag is reset on failure
    throw err; // Re-throw to indicate connection failure
  }
};

// Connect to DB as part of the function invocation lifecycle
// This ensures connection is attempted when the function is invoked
// and cached for subsequent warm invocations.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Failed to connect to database:", error);
    res.status(500).json({ success: false, message: "Database connection failed" });
  }
});


// NOTE: routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend - Vercel Serverless' });
});

// IMPORTANT: Your routes should be prefixed to match your Vercel Function path.
// If this file is `api/index.js`, then `/product` becomes `/api/product`.
// If this file is `api/[...path].js`, then `/product` works as is,
// but the client-side calls would still need to target `/api/product`.

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
app.use('/auth', authRouter);

// Export the Express app instance for Vercel
// This is the crucial part for serverless functions
export default app;