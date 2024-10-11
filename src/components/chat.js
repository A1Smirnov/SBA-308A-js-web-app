// New file to meet the requirment of user manipulation of data within the API through the use of POST, PUT, or PATCH requests
//  src/components/chat.js

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import './components/chat.js'; // Import the chat component

// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Db97dC5CkrnYdte3e0nPI893hZx9VZY",
  authDomain: "mainhub-yo.firebaseapp.com",
  databaseURL: "https://mainhub-yo-default-rtdb.firebaseio.com",
  projectId: "mainhub-yo",
  storageBucket: "mainhub-yo.appspot.com",
  messagingSenderId: "82996133468",
  appId: "1:82996133468:web:71057a48262351736ab099"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to send a message
function sendMessage(name, message) {
    const messageData = {
        name: name,
        message: message,
        timestamp: Date.now()
    };
    const newMessageKey = ref(database, 'messages').push().key; // Generate a new key
    set(ref(database, 'messages/' + newMessageKey), messageData); // Store the message
}

// Function to fetch messages and display them
function fetchMessages() {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = ''; // Clear existing messages
        for (let key in messages) {
            const msg = messages[key];
            messagesContainer.innerHTML += `<div><strong>${msg.name}:</strong> ${msg.message}</div>`;
        }
    });
}

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
fetchMessages();
