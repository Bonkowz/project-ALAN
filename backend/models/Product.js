import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: String,
  productType: Number,
  productQty: Number
}, { collection: 'productData' }); 

export default mongoose.model('Product', productSchema);