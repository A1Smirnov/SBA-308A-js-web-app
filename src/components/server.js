// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Добавить CORS
const Pusher = require('pusher');

const app = express();
const port = 3000;

// Pusher configuration
const pusher = new Pusher({
    appId: '1879526',
    key: 'a2621de12b5ea94fb277',
    secret: '583a17a7c3c86c156ef1',
    cluster: 'us3',
    useTLS: true
});

// Используйте CORS middleware для разрешения запросов
app.use(cors());
app.use(bodyParser.json());

// Endpoint to send messages
app.post('/send-message', async (req, res) => {
    try {
        const { name, message } = req.body;

        // Создание временной метки
        const timestamp = new Date().toLocaleTimeString(); // Форматирование времени по вашему желанию

        await pusher.trigger('chat', 'message-sent', { name, message, timestamp }); // Отправка временной метки
        res.status(200).send('Message sent');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

console.log(`server file test!`);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
