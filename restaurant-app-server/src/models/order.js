'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // Один заказ принадлежит одному пользователю
            Order.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });

            // Многие ко многим: заказ содержит много пунктов меню
            Order.belongsToMany(models.MenuItem, {
                through: 'OrderMenuItems',
                foreignKey: 'orderId',
                otherKey: 'menuItemId',
                as: 'items'
            });
        }
    }

    Order.init(
        {
            isActive: DataTypes.BOOLEAN,
            userId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );

    return Order;
};