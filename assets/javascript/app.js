// Establish WebSocket connection using Socket.IO
const socket = io('http://localhost:5000');

// Generate a unique ID for the client
const clientId = Math.random().toString(36).substring(2, 15);

// Get DOM elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Function to add a message to the chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

// Handle incoming messages
socket.on('message', function(data) {
    // Check if the message is from this client
    if (data.clientId !== clientId) {
        addMessage(data.content, 'received');
    }
});

// Send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'sent'); // Display the message as "sent"
        socket.emit('message', { content: message, clientId: clientId }); // Include the clientId with the message
        messageInput.value = ''; // Clear the input
    }
}

// Bind the send button click event
sendButton.addEventListener('click', sendMessage);

// Bind the Enter key press event
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
