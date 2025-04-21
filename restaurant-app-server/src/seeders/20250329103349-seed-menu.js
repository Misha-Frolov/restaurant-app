'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('MenuItems', [
            {
                title: 'Пицца Маргарита',
                picture: 'https://eda.yandex/images/3781088/63c75c8d766ec65977a03abb225425bf-1100x825.jpg',
                cost: 799,
                callQuantity: 271,
                description: 'Классическая итальянская пицца с томатами, моцареллой и базиликом',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Салат Цезарь',
                picture: 'https://s0.rbk.ru/v6_top_pics/media/img/0/35/347119604441350.webp',
                cost: 499,
                callQuantity: 44,
                description: 'Свежий салат ромэн с заправкой «Цезарь», пармезаном и гренками',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('MenuItems', null, {});
    }
};