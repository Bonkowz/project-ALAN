import Product from '../models/Product.js';
import { ObjectId } from 'mongodb';

// NOTE: POST
export const addProduct = async (req, res) => {
  try {
    const {productName, productDescription, productType, productQty, productPrice} = req.body;
    const newProduct = new Product({productName, productDescription, productType, productQty, productPrice});
    await newProduct.save();
    res.status(200).json({message:"Product created successfully!"});
  } catch (err) {
    res.status(500).json({error: "Error adding product!"});
  }
}

// NOTE: GET
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// NOTE: PATCH
export const updateProduct = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      const newProduct = req.body;
      await Product.updateOne({_id: Object(req.params.id)}, {$set: newProduct});
      res.status(200).json({message: "Updated product!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};

// NOTE: DELETE
export const removeProduct = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      await Product.deleteOne({_id: Object(req.params.id)});
      res.status(200).json({ message: "Deleted product!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};


