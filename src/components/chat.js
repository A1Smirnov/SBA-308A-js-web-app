// New file to meet the requirment of user manipulation of data within the API through the use of POST, PUT, or PATCH requests
//  src/components/chat.js

// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";


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
const db = getFirestore(app);

// Function to send a message
async function sendMessage(name, message) {
    try {
        // Create a new message document in the "messages" collection
        const docRef = await addDoc(collection(db, "messages"), {
            name: name,
            message: message,
            timestamp: Date.now()
        });
        console.log('Message sent with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// Function to fetch messages and display them
function loadMessages() {
    const messagesRef = collection(db, "messages");
    // Listen for real-time updates
    onSnapshot(messagesRef, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        // Update the chat UI with the new messages
        displayMessages(messages);
    });
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ""; // Clear the existing messages
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.name}: ${msg.message}`;
        messagesContainer.appendChild(messageElement);
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
loadMessages(); // Call loadMessages to fetch and display messages