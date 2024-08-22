// Establish WebSocket connection using Socket.IO
const socket = io('http://localhost:5000');

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

    if (type === 'sent') {
        messageDiv.classList.add('animate');
        messageDiv.addEventListener('animationend', () => {
            messageDiv.classList.remove('animate');
        });
    }
}

// Handle incoming messages
socket.on('message', function(message) {
    addMessage(message, 'received');
});

// Send a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'sent');
        socket.emit('message', message); // Emit message event to the server
        messageInput.value = '';
    }
});

// Optional: Handle pressing Enter to send a message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
