import Product from '../models/Product.js';
import { ObjectId } from 'mongodb';

// NOTE: POST
export const addProduct = async (req, res) => {
  try {
    const {productName, productDescription, productType, productQty, productPrice} = req.body;
    const newProduct = new Product({productName, productDescription, productType, productQty, productPrice});
    await newProduct.save();
    res.status(200).json({ message: "Product created successfully!" });
    return;
  } catch (err) {
    res.status(500).json({ error: "Error adding product!" });
    return;
  }
}

// NOTE: GET
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json(products);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
};

export const getAllProductsByQty = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json(products.sort(function (a, b) { return a.productQty - b.productQty }));
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
};

export const getAllProductsByPrice = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json(products.sort(function (a, b) { return a.productPrice - b.productPrice }));
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
};

export const getAllProductsByTotal = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json(products.sort(function (a, b) { return (a.productPrice * a.productQty) - (b.productPrice * b.productQty) }));
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
};

// For sorting with ascending and descending order in mind
export const getAllProductsSorted = async (req, res) => {
  const { sortBy = 'productName', order = 'asc' } = req.query;

  const sortOrder = order === 'desc' ? -1 : 1;

  try {
    const products = await Product.find().sort({ [sortBy]: sortOrder });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sorted products' });
  }
};

// NOTE: PATCH
export const updateProduct = async (req, res) => {
  const newProduct = req.body;
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Product.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Product does not exist!' });
    return;
  }
  try {
    await Product.updateOne({ _id: Object(req.body.id) }, { $set: newProduct });
    res.status(200).json({ message: "Updated product!" });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
    return;
  }
};

// NOTE: DELETE
export const removeProduct = async (req, res) => {
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
  }
  if (!await Product.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Product does not exist!' });
    return;
  }
  try {
    await Product.deleteOne({ _id: Object(req.body.id) });
    res.status(200).json({ message: "Deleted product!" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


