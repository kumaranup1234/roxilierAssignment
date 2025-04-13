const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('Store', {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        ownerEmail: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
    });
