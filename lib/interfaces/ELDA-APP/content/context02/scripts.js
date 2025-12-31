// Toggle the dropdown menu in the header
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Check if dropdownButton and dropdownMenu exist
if (dropdownButton && dropdownMenu) {
    // Show the dropdown when the button is clicked
    dropdownButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
    });

    // Close the dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

// FAQ Button click event
const faqButton = document.getElementById('faqButton');
if (faqButton) {
    faqButton.addEventListener('click', function () {
        const faqContent = `
            <ul>
                <li>What is this platform? - It's a document automation tool for trucking professionals.</li>
                <li>How much does it cost? - Pricing plans start at $9.99/month.</li>
                <li>How can I get support? - Use our chat or email support team.</li>
            </ul>
        `;
        alert(`Frequently Asked Questions:\n${faqContent}`);
    });
}

// How It Works Button click event
const howItWorksButton = document.getElementById('howItWorksButton');
if (howItWorksButton) {
    howItWorksButton.addEventListener('click', function () {
        const howItWorksContent = `
            1. Upload your document.
            2. The system auto-detects required fields.
            3. Complete or approve any missing details.
            4. Download and send completed forms.
        `;
        alert(`How It Works:\n${howItWorksContent}`);
    });
}

// Default Chat Button click event
const defaultButton = document.getElementById('defaultButton');
if (defaultButton) {
    defaultButton.addEventListener('click', function () {
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            messagesContainer.innerHTML += "<p><strong>Default Chat:</strong> How can I assist you today?</p>";
        }
    });
}

// Login Button click event
const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', function () {
        alert("Redirecting to login page... You can integrate this functionality.");
        // You can implement the actual redirection here using `window.location.href`
    });
}

// Chat Input and Send Button functionality
const sendMessageButton = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');
const messagesContainer = document.getElementById('messages');

// Ensure all necessary elements exist
if (sendMessageButton && chatInput && messagesContainer) {
    // Handle sending messages
    sendMessageButton.addEventListener('click', sendMessage);

    // Allow pressing Enter to send messages
    chatInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault(); // Prevent default Enter behavior
        }
    });
}

// Function to handle message sending
function sendMessage() {
    const userMessage = chatInput.value;
    if (userMessage.trim() !== '') {
        // Display user message at the bottom of the messages container
        messagesContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        
        // Simulate bot reply for demonstration
        setTimeout(() => {
            messagesContainer.innerHTML += `<p><strong>Bot:</strong> Thank you for your message!</p>`;
        }, 500);

        // Clear input field after sending
        chatInput.value = '';

        // Scroll to the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}