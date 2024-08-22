// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:5000'); // Adjust URL as needed

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
socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    addMessage(message.content, 'received');
};

// Send a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'sent');
        socket.send(JSON.stringify({ content: message }));
        messageInput.value = '';
    }
});

// Optional: Handle pressing Enter to send a message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

