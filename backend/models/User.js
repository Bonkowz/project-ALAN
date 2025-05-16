import mongoose from 'mongoose';

// NOTE: if if db contains dup emails unique constraint wont be applied, to apply do the ff
// NOTE: 1) Remove all documents from the users collection. 
// NOTE: 2) From the mongo shell, execute the command: db.users.createIndex({email: 1}, {unique: true})
const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  middleName: {type: String},
  lastName: {type: String, required: true },
  userType: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
}, { collection: 'user' }); 

export default mongoose.model('User', userSchema);


