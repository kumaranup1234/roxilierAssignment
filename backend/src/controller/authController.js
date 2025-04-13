const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require("../models");

const registerUser = async (req, res) => {

    try {
        const {name, email, address, password} = req.body;

        // validation
        if (!name || name.length < 0 || name.length > 60) {
            return res.status(400).json({message: 'Name must be 20-60 characters long.'});
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({message: 'Invalid email format.'});
        }

        if (!address || address.length > 400) {
            return res.status(400).json({message: 'Address must be max 400 characters.'});
        }

        if (
            !password ||
            password.length < 8 ||
            password.length > 16 ||
            !/[A-Z]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            return res.status(400).json({message: 'Password must be 8–16 chars with one uppercase and one special char.'});
        }

        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists with this email.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            address,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User registered successfully.' });
    }catch (error){
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
};

const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ where: {email} });
        if (!user) {
            return res.status(400).json({message: 'User not found.'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error){
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error during login.' });
    }
};



module.exports = {
    registerUser,
    loginUser,
}