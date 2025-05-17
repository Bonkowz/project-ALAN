import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  orderQty: { type: Number, required: true },
  orderStatus: { type: Number, required: true },
  email: { type: String, required: true },
  dateOrdered: { type: String, required: true },
  time: { type: String, required: true }
}, { collection: 'transaction' });

export default mongoose.model('Transaction', transactionSchema);

