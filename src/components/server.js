// server.js

const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());

// Endpoint to send messages
app.post('/send-message', (req, res) => {
    const { name, message } = req.body;

    // Trigger a new message event on Pusher
    pusher.trigger('chat', 'message-sent', {
        name,
        message
    });

    res.status(200).send('Message sent');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
