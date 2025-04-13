const {Store, Rating, User} = require("../models");


const getAllRatings = async (req, res) => {
    try{
        const ownerId = req.user.id;
        const store = await Store.findOne({ where: { ownerId } });
        if (!store) return res.status(404).json({ message: 'No store found for this owner' });

        const ratings = await Rating.findAll({ where: { storeId: store.id },
            include: {
            model: User,
                attributes: ['id', 'name', 'email', 'address'],
            }
        });


        const users = ratings.map(r => ({
            id: r.id,
            name: r.User?.name || "N/A",
            email: r.User?.email || "N/A",
            address: r.User?.address || "-",
            rating: r.rating,
        }));
        console.log(users);


        return res.status(200).json({ users });

    } catch (error) {
        console.error('Error fetching users for store owner:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const storeAverageRating = async (req, res) => {

    try {
        const ownerId = req.user.id;
        const store = await Store.findOne({
            where: { ownerId },
            include: {
                model: Rating,
                attributes: ['rating']
            }
        });

        if (!store) return res.status(404).json({ message: 'Store not found' });
        const ratings = store.Ratings.map(r => r.rating);
        const average =
            ratings.length > 0
             ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
             : '0.0';

        store.averageRating = average;
        await store.save();

        return res.status(200).json({
            storeId: store.id,
            name: store.name,
            address: store.address,
            averageRating: average,
            totalRatings: ratings.length
        });

    } catch (error) {
        console.error('Error fetching store rating:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllRatings,
    storeAverageRating,
}