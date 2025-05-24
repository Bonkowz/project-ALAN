import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/User.js';

// NOTE: POST
export const register = async (req, res) => {
    const { firstName, middleName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, middleName, lastName, userType: "customer", email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "User registered successfully!" });
        return;
    } catch (err) {
        res.status(500).json({ error: err });
        return;
    }
}

export const registerAdmin = async (req, res) => {
    const { firstName, middleName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, middleName, lastName, userType: "administrator", email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "Admin registered successfully!" });
        return;
    } catch (err) {
        res.status(500).json({ error: err });
        return;
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        jwt.sign(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id,
                email: user.email,
                userType: user.userType
            },
            process.env.SECRET_KEY,
            { expiresIn: '1hr' }, // NOTE: cookies dies after 1hr
            (err, token) => {
                if (err) throw err;
                res
                    .status(200)
                    .cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                    }, (err))
                    .json(user)
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

// NOTE: GET
export const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, user) => {
            if (err) throw err;
            res.status(200).json(user);
        })
    } else {
        res.status(500).json(null);
    }
}

// NOTE: proper handling breaks other code 
export const logout = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ success: true, message: "Logged out successfully" });
};