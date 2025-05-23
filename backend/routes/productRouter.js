import express from 'express';
import { addProduct, getAllProducts, getAllProductsByQty, getAllProductsByPrice, getAllProductsByTotal, updateProduct, removeProduct, getAllProductsSorted,  } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/get-all-products-by-qty', getAllProductsByQty);
productRouter.get('/get-all-products-by-price', getAllProductsByPrice);
productRouter.get('/get-all-products-by-total', getAllProductsByTotal);
productRouter.get('/get-all-products', getAllProducts);
productRouter.patch('/update-product', updateProduct);
productRouter.delete('/remove-product', removeProduct);
productRouter.get('/get-all-products-sorted', getAllProductsSorted);


export default productRouter;
