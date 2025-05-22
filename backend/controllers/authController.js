import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/User.js';

const SECRET_KEY = "secretkey"; // TODO: move in env file to be safer

// NOTE: POST
export const register = async (req, res) => {
    const {firstName, middleName, lastName, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({firstName, middleName, lastName, userType: "customer", email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({message:"User registered successfully!"});
        return;
    } catch (err) {
        res.status(500).json({error: err});
        return;
    }
}

// NOTE: POST
// TODO: add so that it works with name 
// TODO: add distinction for admin vs customer
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    try {
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
        res.json({ message: 'Login successful' })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}