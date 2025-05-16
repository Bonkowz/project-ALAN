import mongoose from 'mongoose';

const salesReportSchema = new mongoose.Schema({
  productName: {type: String, required: true },
    
}, { collection: 'salesReport' }); 

export default mongoose.model('SalesReport', salesReportSchema);


