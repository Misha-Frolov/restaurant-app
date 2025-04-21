'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Один пользователь может иметь много заказов
            User.hasMany(models.Order, {
                foreignKey: 'userId',
                as: 'orders'
            });
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            role: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};