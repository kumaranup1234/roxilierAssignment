const {Rating, User, Store} = require("../models");
const {hash, compare} = require("bcrypt");
const {recalculateStoreAverage} = require("../utils/recalculateAverage");


const getAllStores = async (req, res) => {
    try {
        const userId = req.user?.id;

        const stores = await Store.findAll({
            include: [
                {
                    model: Rating,
                    required: false,
                    attributes: ['rating', 'userId']
                }
            ]
        });

        const result = stores.map(store => {
            // Find the current user's rating if present
            const userRatingObj = userId ? store.Ratings.find(r => r.userId === userId) : null;

            return {
                id: store.id,
                name: store.name,
                address: store.address,
                averageRating: store.averageRating || 0,
                userRating: userRatingObj?.rating || 0,
                totalRatings: store.Ratings.length // This is correct
            };
        });
        res.status(200).json({ stores: result });

    } catch (error) {
        console.error('Error fetching stores:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const getSingleStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await getSingleStore(id);
        res.status(200).json({
            store,
        })

    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const submitRating = async (req, res) => {
    try {

        const { id: storeId } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;
        console.log(userId);

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const existing = await Rating.findOne({ where: { userId, storeId } });
        if (existing) {
            existing.rating = rating;
            existing.userId = userId;
            await existing.save();
            await recalculateStoreAverage(storeId);
            return res.status(200).json({ message: 'Rating updated', rating: existing });
        } else {
            const newRating = await Rating.create({ userId, storeId, rating });
            await recalculateStoreAverage(storeId);
            return res.status(201).json({ message: 'Rating submitted', rating: newRating });
        }
    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllRatings = async (req, res) => {
    try {
        const userId = req.user.id;

        const ratings = await Rating.findAll({
            where: { userId },
            include: ['Store']
        });

        return res.status(200).json({ ratings });
    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const updatePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (
            !newPassword ||
            newPassword.length < 8 ||
            newPassword.length > 16 ||
            !/[A-Z]/.test(newPassword) ||
            !/[!@#$%^&*]/.test(newPassword)
        ) {
            return res.status(400).json({ message: 'New password must be 8-16 chars with uppercase and special char' });
        }

        const user = await User.findByPk(userId);
        const isMatch = await compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        const hashed = await hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Error creating store:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    getAllStores,
    getSingleStore,
    getAllRatings,
    submitRating,
    updatePassword,
}