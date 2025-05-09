import mongoose from 'mongoose';

// NOTE: require all fields?
const productSchema = new mongoose.Schema({
  productId: {type: String, required: true },  
  productName: {type: String, required: true },
  productDescription: String,
  productType: Number,
  productQty: Number
}, { collection: 'product' }); 

export default mongoose.model('Product', productSchema);
