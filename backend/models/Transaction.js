import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  productId: Number,
  orderQty: Number,
  orderStatus: Number,
  email: String,
  dateOrdered: String,
  time: String
}, { collection: 'transaction' }); 

export default mongoose.model('Transaction', transactionSchema);
