import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { ObjectId } from 'mongodb';

// Create // POST REQUEST
// Read // GET REQUEST
// Update // PUT or PATCH REQUEST
// Delete // DELETE REQUEST

// NOTE: POST
export const addUser = async (req, res) => {
  const {firstName, middleName, lastName, userType, email, password} = req.body;
  const newUser = new User({firstName, middleName, lastName, userType, email, password});
  try {
    await newUser.save();
    res.status(200).json({message:"User created successfully!"});
    return;
  } catch (err) {
    res.status(500).json({error: err});
    return;
  }
}

// NOTE: GET
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json(users);
    return;
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch users' });
    return;
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

export const getCustomerTransactions = async (req, res) => {
  try {
    const customers = await User.aggregate([
      {
        $match: { userType: 'customer' } // Get only customers
      },
      {
        $lookup: {
          from: 'transaction',
          localField: 'email',
          foreignField: 'email',
          as: 'transactions'
        }
      },
      {
        $addFields: {
          totalSpent: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$transactions',
                    as: 't',
                    cond: { $eq: ['$$t.orderStatus', 1] } // Only completed transactions
                  }
                },
                as: 'completedTransaction',
                in: {
                  $multiply: [
                    '$$completedTransaction.orderQty',
                    '$$completedTransaction.orderProductPrice'
                  ]
                }
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          totalSpent: 1
        }
      }
    ]);

    res.status(200).json(customers);
  } catch (err) {
    console.error("Error in getCustomerTransactions:", err);
    res.status(500).json({ error: "Failed to fetch customer transactions" });
  }
};


  // NOTE: PATCH
export const updateUser = async (req, res) => {
  const newUser = req.body;
  if (!ObjectId.isValid(req.body.id)){
    res.status(500).json({error: "Document ID not valid!"});
    return;
  } 
  if (!await User.findOne({_id: Object(req.body.id)})){
    res.status(500).json({ error: 'User does not exist!' });
    return;
  }
  try { 
    await User.updateOne({_id: Object(req.body.id)}, {$set: newUser});
    res.status(200).json({message: "Updated user!"});
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
    return;
  }
}

// NOTE: DELETE
export const removeUser = async (req, res) => {
  if (!ObjectId.isValid(req.body.id)){
    res.status(500).json({error: "Document ID not valid!"});
    return;
  }
  if (!await User.findOne({_id: Object(req.body.id)})){
    res.status(500).json({ error: 'User does not exist!' });
    return;
  }
  try {
    await User.deleteOne({_id: Object(req.body.id)});
    res.status(200).json({message: "Removed user!"});
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user!' });
    return;
  }
};


