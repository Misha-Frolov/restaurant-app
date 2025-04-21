'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MenuItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Связь "многие ко многим" с Order через промежуточную таблицу OrderMenuItems
            MenuItem.belongsToMany(models.Order, {
                through: 'OrderMenuItems',
                foreignKey: 'menuItemId',
                otherKey: 'orderId',
                as: 'orders'
            });
        }
    }

    MenuItem.init(
        {
            title: DataTypes.STRING,
            picture: DataTypes.STRING,
            cost: DataTypes.FLOAT,
            callQuantity: DataTypes.INTEGER,
            description: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'MenuItem',
        }
    );

    return MenuItem;
};