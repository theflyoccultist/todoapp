import { createUser, findOne } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

export async function register(req, res) {
    const { username, password } = req.body;
    
    try {
        console.log(`attempting to register with username: ${username}`)
        const existingUser = await findOne(username);
        if (existingUser) {
            return res.status(400).json({ message: 'username already taken' });
        }

        const user = await createUser(username, password);

        const token = generateAccessToken({ id: user.id });
        
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'an error occured', error: error.message });
    }
}

export async function login(req, res) {
    const { username, password} = req.body;

    try {
        console.log(`Attempting to log in with username: ${username}`);
        const user = await findOne(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password 2' });
        }

        console.log('Password is valid, generating token');

        const token = generateAccessToken({ id: user.id });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}