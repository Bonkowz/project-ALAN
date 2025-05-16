import User from '../models/User.js';
import { ObjectId } from 'mongodb';

// Create // POST REQUEST
// Read // GET REQUEST
// Update // PUT or PATCH REQUEST
// Delete // DELETE REQUEST

// NOTE: POST
export const addUser = async (req, res) => {
  try {
    const {firstName, middleName, lastName, userType, email, password} = req.body;
    const newUser = new User({firstName, middleName, lastName, userType, email, password});
    await newUser.save();
    res.status(200).json({message:"User created successfully!"});
  } catch (err) {
    res.status(500).json({error: "Error adding user!"});
  }
}

// NOTE: GET
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch users' });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const users = await User.find({userType: "customer"});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch users' });
  }
};


// NOTE: PATCH
export const updateUser = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try { 
      const newUser = req.body;
      await User.updateOne({_id: Object(req.params.id)}, {$set: newUser});
      res.status(200).json({message: "Updated user!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};

// NOTE: DELETE
export const removeUser = async (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    try {
      await User.deleteOne({_id: Object(req.params.id)});
      res.status(200).json({ message: "Deleted user!"});
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }else{
    res.status(500).json({error: "Document ID not valid!"});
  }
};




