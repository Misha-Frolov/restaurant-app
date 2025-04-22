const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize, User, Order, MenuItem} = require('./models');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// Главная
app.get('/', (req, res) => {
    res.json({message: 'API для ресторана работает'});
});

// Получить все активные заказы
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {isActive: true},
            include: [{model: MenuItem, as: 'items'}]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({error: 'Ошибка получения заказов'});
    }
});

// Получить заказ по ID
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{model: MenuItem, as: 'items'}]
        });

        if (!order) {
            return res.status(404).json({error: 'Заказ не найден'});
        }

        const total = order.items.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0).toFixed(2);
        res.json({order, total});
    } catch (err) {
        res.status(500).json({error: 'Ошибка получения заказа'});
    }
});

// Создать заказ
app.post('/api/orders', async (req, res) => {
    try {
        const {userId, menuItems} = req.body;

        if (!userId || !menuItems || menuItems.length === 0) {
            return res.status(400).json({error: 'Необходимо указать официанта и пункты меню'});
        }

        const order = await Order.create({userId, isActive: true});
        await order.addItems(Array.isArray(menuItems) ? menuItems : [menuItems]);

        res.status(201).json({message: 'Заказ создан', orderId: order.id});
    } catch (err) {
        res.status(500).json({error: 'Ошибка создания заказа'});
    }
});

// Обновить заказ
app.put('/api/orders/:id', async (req, res) => {
    try {
        const {isActive, items} = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({error: 'Заказ не найден'});
        }

        await order.update({isActive});

        if (items) {
            await order.setItems(Array.isArray(items) ? items : [items]);
        }

        res.status(200).json({message: 'Заказ обновлен'});
    } catch (err) {
        res.status(500).json({error: 'Ошибка обновления заказа'});
    }
});

// Удалить заказ (пометить неактивным)
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({error: 'Заказ не найден'});
        }

        await order.update({isActive: false});
        res.json({message: 'Заказ закрыт'});
    } catch (err) {
        res.status(500).json({error: 'Ошибка удаления заказа'});
    }
});

// Получить все блюда из меню
app.get('/api/menu', async (req, res) => {
    try {
        const menu = await MenuItem.findAll();
        res.json(menu);
    } catch (err) {
        res.status(500).json({error: 'Ошибка загрузки меню'});
    }
});

// Получить активные заказы определенного официанта
app.get('/api/waiter-orders/:id', async (req, res) => {
    try {
        const waiter = await User.findByPk(req.params.id);
        if (!waiter) {
            return res.status(404).json({error: 'Официант не найден'});
        }

        const orders = await Order.findAll({
            where: {userId: waiter.id, isActive: true},
            include: [{model: MenuItem, as: 'items'}]
        });

        res.json({waiter, orders});
    } catch (err) {
        res.status(500).json({error: 'Ошибка получения заказов официанта'});
    }
});

// Добавить нового официанта
app.post('/api/waiters', async (req, res) => {
    try {
        const {name, role} = req.body;
        if (!name || !role) {
            return res.status(400).json({error: 'Необходимо указать имя и роль'});
        }

        const waiter = await User.create({name, role});
        res.status(201).json(waiter);
    } catch (err) {
        res.status(500).json({error: 'Ошибка создания сотрудника'});
    }
});

// Получить пользователя по ID
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({message: 'Пользователь не найден'});
    res.json(user);
});

// Получить всех официантов
app.get('/api/waiters', async (req, res) => {
    try {
        const waiters = await User.findAll({where: {role: 'waiter'}});
        res.json(waiters);
    } catch (err) {
        console.error('Ошибка при получении официантов:', err);
        res.status(500).json({message: 'Ошибка сервера'});
    }
});

// Запуск сервера
app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`JSON API сервер запущен на http://localhost:${PORT}`);
});
