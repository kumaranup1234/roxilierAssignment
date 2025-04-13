const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const StoreModel = require('./Store');
const RatingModel = require('./Rating');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});


// init models
const User = UserModel(sequelize);
const Store = StoreModel(sequelize);
const Rating = RatingModel(sequelize);

// associations
Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Store.hasMany(Rating, { foreignKey: 'storeId' });
User.hasOne(Store, { foreignKey: 'ownerId', as: 'store' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database sync complete!');
    })
    .catch((error) => {
        console.error('Error syncing the database:', error);
    });


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected ✅');
        await sequelize.sync(); // or sync({ force: true }) during dev
    } catch (error) {
        console.error('Error connecting to DB :', error);
    }
};

module.exports = { sequelize, connectDB, User, Store, Rating };
