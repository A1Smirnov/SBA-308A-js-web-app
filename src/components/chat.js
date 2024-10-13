// src/components/chat.js

// Initialize Pusher
const pusher = new Pusher('a2621de12b5ea94fb277', {
    cluster: 'us3'
});

// Subscribe to the channel
const channel = pusher.subscribe('chat');

// Function to send a message
async function sendMessage(name, message) {
    // Here you should send the message to your server (via a POST request) to save it
    const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
    });

    if (response.ok) {
        console.log('Message sent');
    } else {
        console.error('Error sending message');
    }
}

// Function to display messages in the chat interface
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ""; // Clear the existing messages
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.name}: ${msg.message}`;
        messagesContainer.appendChild(messageElement);
    });
}

// Listen for new messages
channel.bind('message-sent', function(data) {
    displayMessages([data]); // Display the new message
});

// Setup chat interface
function setupChat() {
    const chatForm = document.getElementById('chat-form');
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name-input').value;
        const messageInput = document.getElementById('message-input').value;

        // Send message only if the name and message are provided
        if (nameInput && messageInput) {
            sendMessage(nameInput, messageInput);
            document.getElementById('message-input').value = ''; // Clear the input
        }
    });
}

// Initialize chat
setupChat();
