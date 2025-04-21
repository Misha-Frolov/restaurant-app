'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Orders', [
            {
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Orders', null, {});
    }
};