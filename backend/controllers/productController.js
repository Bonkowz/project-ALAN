import productSchema from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
