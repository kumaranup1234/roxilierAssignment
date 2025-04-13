// Admin: create a store
const { User, Store, Rating} = require("../models");
const createStore = async (req, res) => {
    try {
        const { name, address, ownerEmail } = req.body;

        if (!name || name.length < 20 || name.length > 60) {
            return res.status(400).json({ message: 'Store name must be between 20 and 60 characters.' });
        }
        if (!address || address.length > 400) {
            return res.status(400).json({ message: 'Address must be max 400 characters.' });
        }

        if (!ownerEmail) {
            return res.status(400).json({ message: 'Store owner email is required.' });
        }

        const owner = await User.findOne({ where: { email: ownerEmail } });
        if (!owner || owner.role !== 'store_owner') {
            return res.status(400).json({ message: 'Provided email is not a valid store owner.' });
        }
        const store = await Store.create({
            name,
            address,
            ownerEmail,
            ownerId: owner.id
        })

        return res.status(201).json({
            message: 'Store created successfully',
            store
        });

    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: list all stores (with optional filters)
const getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        return res.status(200).json({
            stores
        })

    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: get a single store by ID
const getSingleStore = async (req, res) => {
    try {
        const { id } = req.params;

        const store = await Store.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'owner',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        return res.status(200).json({ store });
    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Admin: update store
const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address } = req.body;

        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: 'Store not found' });

        await store.update({ name, email, address });

        return res.status(200).json({ message: 'Store updated successfully', store });

    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: delete store
const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) return res.status(404).json({ message: 'Store not found' });

        await store.destroy();
        return res.status(200).json({ message: 'Store deleted successfully' });

    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: create user (admin/user/store_owner)
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;

        if (!['admin', 'user', 'store_owner'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'User already exists with this email.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            address,
            password: hashedPassword,
            role
        });

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Admin: list all users (with filters)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Store,
                    as: 'store',
                    attributes: ['averageRating'],
                },
            ],
            attributes: { exclude: ['password'] },
        });

        console.log(users);
        return res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: get user by ID
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });
        let storeRating = null;
        if (user.role === 'store_owner') {
            const store = await Store.findOne({ where: { ownerId: user.id } });
            if (store) storeRating = store.averageRating || 0;
        }

        return res.status(200).json({ user, storeRating });

    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address, role } = req.body;

        if (!['admin', 'user', 'store_owner'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ name, email, address, role });

        return res.status(200).json({ message: 'User updated successfully', user });

    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

// Admin: get dashboard stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        return res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings
        });
    } catch (error) {
        console.error('Error fetching store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports = {
    createStore,
    getAllStores,
    getSingleStore,
    updateStore,
    deleteStore,
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getDashboardStats
};
