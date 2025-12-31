// Add suggestion to the chat input
function addSuggestion(text) {
  const chatInput = document.querySelector('input[type="text"], #chatbox');
  if (chatInput) {
    chatInput.value = text; // Set the suggestion in the input field
    chatInput.focus(); // Focus on the input field
  }
}

// Show or hide additional options
function showMoreOptions() {
  const moreOptions = document.getElementById('more-options');
  const moreOptionsButton = document.getElementById('more-options-button');
  if (moreOptions.style.display === 'none') {
    moreOptions.style.display = 'flex'; // Show additional options
    moreOptionsButton.innerText = 'Less'; // Update button text
  } else {
    moreOptions.style.display = 'none'; // Hide additional options
    moreOptionsButton.innerText = 'More'; // Reset button text
  }
}

// Toggle the dropdown menu in the header
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Check if dropdownButton and dropdownMenu exist
if (dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show'); // Show/hide the dropdown
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove('show'); // Hide the dropdown
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

// Login Button click event
const loginButton = document.getElementById('loginButton');
if (loginButton) {
  loginButton.addEventListener('click', function () {
    alert('Redirecting to login page... You can integrate this functionality.');
    // Redirect example: window.location.href = '/login';
  });
}

// Chat Input and Send Button functionality for ELDA (Enhanced Live Dispatch Assistant)
const sendMessageButton = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');
const messagesContainer = document.getElementById('messages');

if (sendMessageButton && chatInput && messagesContainer) {
  sendMessageButton.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      sendMessage();
      event.preventDefault(); // Prevent default Enter behavior
    }
  });
}

function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage !== '') {
    // Display user message
    messagesContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    // Simulate bot reply
    setTimeout(() => {
      messagesContainer.innerHTML += `<p><strong>Bot:</strong> Thank you for your message!</p>`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to latest message
    }, 500);

    chatInput.value = ''; // Clear input field
  }
}

// Default Pop-Up Button click event
const defaultButton = document.getElementById('defaultButton');
if (defaultButton) {
  defaultButton.addEventListener('click', function () {
    const modal = document.getElementById('defaultModal'); // Use the modal ID
    modal.style.display = 'block'; // Show the modal
  });
}

// Close the modal when the close button is clicked
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', function () {
    const modal = document.getElementById('defaultModal');
    modal.style.display = 'none'; // Hide the modal
  });
}

// Close the modal if clicked outside of the modal content
window.addEventListener('click', function (event) {
  const modal = document.getElementById('defaultModal');
  if (event.target === modal) {
    modal.style.display = 'none'; // Hide the modal when clicking outside
  }
});
