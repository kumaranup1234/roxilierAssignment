const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
    sequelize.define('User', {
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'store_owner'),
            defaultValue: 'user',
        },
    });
