'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                name: 'Алиса',
                role: 'waiter',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Петр',
                role: 'waiter',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Данил',
                role: 'waiter',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Иван',
                role: 'chef',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Екатерина',
                role: 'customer',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};