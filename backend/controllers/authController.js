import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from '../models/User.js';

const SECRET_KEY = "secretkey"; // TODO: move in env file to be safer
const REFRESH_KEY = "refreshkey"; // TODO: move in env file to be safer

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

// NOTE: POST
// TODO: add so that it works with name 
// TODO: add distinction for admin vs customer
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
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userId": user._id,
                    "userType": user.userType
                }
            },
            SECRET_KEY,
            {
                expiresIn: '1hr'
            }
        );
        const refreshToken = jwt.sign(
            {
                "userID": user._id
            },
            REFRESH_KEY,
            {
                expiresIn: '1d'
            }
        );

        res.cookie('jwt', refreshToken, {
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })

    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

export const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        REFRESH_KEY,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ _id: Object(decoded.userId) }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userId": user._id,
                        "userType": user.userType
                    }
                },
                SECRET_KEY,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

export const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) 
    res.clearCookie('jwt', {sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}
