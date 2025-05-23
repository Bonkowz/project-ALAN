import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productImg: { type: String, required: false },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productType: { type: Number, required: true },
  productQty: { type: Number, required: true },
  productPrice: { type: Number, required: true },
}, { collection: 'product' });

export default mongoose.model('Product', productSchema);