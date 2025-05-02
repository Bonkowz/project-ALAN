import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  userType: String,
  email: String,
  password: String,
}, { collection: 'user' }); 

export default mongoose.model('User', userSchema);


