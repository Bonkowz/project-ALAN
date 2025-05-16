import express from 'express';
import { addProduct, getAllProducts, updateProduct, removeProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/get-all-products', getAllProducts);
productRouter.patch('/update-product/:id', updateProduct);
productRouter.delete('/remove-product/:id', removeProduct);

export default productRouter;
