import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  middleName: {type: String},
  lastName: {type: String, required: true },
  userType: {type: String, required: true },
  email: {type: String, required: true },
  password: {type: String, required: true },
}, { collection: 'user' }); 

export default mongoose.model('User', userSchema);


