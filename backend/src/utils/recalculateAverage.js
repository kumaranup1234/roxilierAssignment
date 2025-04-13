const { Rating, Store } = require('../models');

const recalculateStoreAverage = async (storeId) => {
    const ratings = await Rating.findAll({ where: { storeId } });

    if (ratings.length === 0) {
        await Store.update({ averageRating: 0 }, { where: { id: storeId } });
        return;
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / ratings.length).toFixed(1);

    await Store.update({ averageRating: avg }, { where: { id: storeId } });
};

module.exports = { recalculateStoreAverage };
