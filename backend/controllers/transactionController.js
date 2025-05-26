import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';
import { ObjectId } from 'mongodb';

// NOTE: POST
export const addTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.body.productId)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }

  const product = await Product.findById(req.body.productId);
  if (!product) {
    res.status(500).json({ error: 'Product does not exist!' });
    return;
  }

  try {
    const {
      productId,
      orderQty,
      orderStatus,
      email,
      dateOrdered,
      time
    } = req.body;

    // Use the product's current price 
    const orderProductPrice = product.productPrice;

    var result = await Transaction.updateOne(
      { productId: new ObjectId(req.body.productId), email: req.body.email, orderStatus: 3 },
      { $inc: { orderQty: 1 } }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Transaction updated successfully!" });
    }

    const newTransaction = new Transaction({
      productId,
      orderProductPrice,
      orderQty,
      orderStatus,
      email,
      dateOrdered,
      time
    })

    await newTransaction.save();
    res.status(200).json({ message: "Transaction created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding transaction!" });
  }
};

// NOTE: GET
// NOTE: (Int: 0 Pending / 1 Completed / 2 Canceled / 3 Cart)
export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsPending = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 0 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCompleted = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 1 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCancelled = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 2 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};

export const getAllTransactionsCart = async (req, res) => {
  const transactions = await Transaction.find({ orderStatus: 3 });
  try {
    res.status(200).json(transactions);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
    return;
  }
};
// https://www.geeksforgeeks.org/mongoose-aggregate-aggregate-api/
export const getFilteredTransactionsMerged = async (req, res) => {
  try {
    const statusFilter = parseInt(req.query.orderStatus);

    if (isNaN(statusFilter)) {
      return res.status(400).json({ error: 'Invalid or missing orderStatus parameter' });
    }


    const matchStage = { orderStatus: statusFilter };

    // Only add email filter if it is present in query (For user)
    if (req.query.email) {
      matchStage.email = req.query.email;
    }

    const transactions = await Transaction.aggregate([
      {
        $match: matchStage
      },
      {
        $lookup: {
          from: 'product',
          localField: 'productId',
          foreignField: '_id',
          as: 'productData'
        }
      },
      {
        $unwind: '$productData'
      },
      {
        $project: {
          _id: 1,
          email: 1,
          orderQty: 1,
          orderStatus: 1,
          dateOrdered: 1,
          time: 1,
          orderProductPrice: 1,

          productId: '$productData._id',
          productImg: '$productData.productImg',
          productName: '$productData.productName',
          productType: '$productData.productType',
          productQty: '$productData.productQty',
          productPrice: '$productData.productPrice',
        }
      }
    ]);

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Failed to fetch merged transactions' });
  }
};


export const getFilteredTransactionsMergedByDate = async (req, res) => {
  const { orderStatus, range } = req.query;

  // Validate orderStatus
  const statusFilter = parseInt(orderStatus);
  if (isNaN(statusFilter)) {
    return res.status(400).json({ error: 'Invalid or missing orderStatus parameter' });
  }

  // Compute start date based on range
  let startDate = new Date();
  const now = new Date();

  switch (range) {
    case 'Weekly':
      const currentDay = now.getDay(); // Sunday = 0
      startDate.setDate(now.getDate() - currentDay);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'Monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'Annual':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return res.status(400).json({ error: 'Invalid or missing range parameter' });
  }

  // Format to YYYY-MM-DD string
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formattedStartDate = formatDate(startDate);

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          orderStatus: statusFilter,
          dateOrdered: { $gte: formattedStartDate }
        }
      },
      {
        $lookup: {
          from: 'product',
          localField: 'productId',
          foreignField: '_id',
          as: 'productData'
        }
      },
      {
        $unwind: '$productData'
      },
      {
        $project: {
          _id: 1,
          email: 1,
          orderQty: 1,
          orderStatus: 1,
          dateOrdered: 1,
          time: 1,
          orderProductPrice: 1,

          productId: '$productData._id',
          productImg: '$productData.productImg',
          productName: '$productData.productName',
          productType: '$productData.productType',
          productQty: '$productData.productQty',
          productPrice: '$productData.productPrice',
        }
      }
    ]);

    res.status(200).json(transactions);
  } catch (err) {
    console.error('Aggregation error:', err);
    res.status(500).json({ error: 'Failed to fetch filtered transactions by date' });
  }
};


// NOTE: PUT
export const updateTransaction = async (req, res) => {
  const newTransaction = req.body;
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Transaction.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Transaction does not exist!' });
    return;
  }
  try {
    await Transaction.updateOne({ _id: Object(req.body.id) }, { $set: newTransaction });
    res.status(200).json({ message: "Updated transaction!" });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to update transaction' });
    return;
  }
};

// NOTE: DELETE
export const removeTransaction = async (req, res) => {
  if (!ObjectId.isValid(req.body.id)) {
    res.status(500).json({ error: "Document ID not valid!" });
    return;
  }
  if (!await Transaction.findOne({ _id: Object(req.body.id) })) {
    res.status(500).json({ error: 'Transaction does not exist!' });
    return;
  }
  try {
    await Transaction.deleteOne({ _id: Object(req.body.id) });
    res.status(200).json({ message: "Deleted transaction!" });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' });
    return;
  }
};
