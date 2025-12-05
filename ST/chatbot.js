// AI Chatbot for SportsTube
class SportsTubeChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.addEventListeners();
        this.addWelcomeMessage();
    }

    createChatWidget() {
        const chatHTML = `
            <div class="chatbot-widget" id="chatbotWidget">
                <!-- Chat Button -->
                <button class="chatbot-button" id="chatbotButton">
                    <span class="chatbot-icon">Chat</span>
                    <span class="chatbot-close-icon">Close</span>
                </button>

                <!-- Chat Window -->
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-header-content">
                            <div class="chatbot-avatar">AI</div>
                            <div class="chatbot-header-text">
                                <h3>SportsTube Assistant</h3>
                                <p class="chatbot-status">Online</p>
                            </div>
                        </div>
                        <button class="chatbot-minimize" id="chatbotMinimize">-</button>
                    </div>

                    <div class="chatbot-messages" id="chatbotMessages">
                        <!-- Messages will be added here -->
                    </div>

                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            class="chatbot-input" 
                            id="chatbotInput" 
                            placeholder="Ask me anything about sports..."
                            autocomplete="off"
                        />
                        <button class="chatbot-send" id="chatbotSend">
                            <span>Send</span>
                        </button>
                    </div>

                    <div class="chatbot-suggestions" id="chatbotSuggestions">
                        <button class="suggestion-chip">Basketball videos</button>
                        <button class="suggestion-chip">Football highlights</button>
                        <button class="suggestion-chip">Watch history</button>
                        <button class="suggestion-chip">Help</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    addEventListeners() {
        const button = document.getElementById('chatbotButton');
        const minimize = document.getElementById('chatbotMinimize');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        const suggestions = document.querySelectorAll('.suggestion-chip');

        button.addEventListener('click', () => this.toggleChat());
        minimize.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        suggestions.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const text = e.target.textContent.trim();
                this.handleSuggestion(text);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const widget = document.getElementById('chatbotWidget');
        const button = document.getElementById('chatbotButton');
        
        if (this.isOpen) {
            widget.classList.add('active');
            button.classList.add('active');
            document.getElementById('chatbotInput').focus();
        } else {
            widget.classList.remove('active');
            button.classList.remove('active');
        }
    }

    addWelcomeMessage() {
        const welcomeMsg = "Hi! I'm your SportsTube assistant. I can help you find videos, navigate the site, or answer questions about sports content. How can I help you today?";
        this.addMessage(welcomeMsg, 'bot');
    }

    addMessage(text, sender = 'user') {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">Bot</div>
                <div class="message-content">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="message-avatar">You</div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ text, sender, timestamp: Date.now() });
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getAIResponse(message);
            this.addMessage(response, 'bot');
        }, 800);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">Bot</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    handleSuggestion(text) {
        this.addMessage(text, 'user');
        setTimeout(() => {
            const response = this.getAIResponse(text);
            this.addMessage(response, 'bot');
        }, 600);
    }

    getAIResponse(message) {
        const lowerMsg = message.toLowerCase();

        // Basketball
        if (lowerMsg.includes('basketball') || lowerMsg.includes('nba')) {
            return "Here are some amazing basketball videos:\n\n• LOWLIGHTS FROM BASKETBALL STARS!\n• NBA Epic Moments\n• No Regard For Human Life Compilation\n• Top Basketball PLAYS of 2024\n\nWould you like me to navigate you to the Basketball section?";
        }

        // Football/Soccer
        if (lowerMsg.includes('football') || lowerMsg.includes('soccer')) {
            return "Check out these incredible football videos:\n\n• 1 in a Trillion Moments\n• Best Skills Of Year 2024\n• Moments that Can't be Repeated\n• Unforgettable Goals\n\nI can take you to the Football section if you'd like!";
        }

        // Hockey
        if (lowerMsg.includes('hockey') || lowerMsg.includes('nhl')) {
            return "Amazing hockey content available:\n\n• Best Dangles in NHL History\n• Best Saves in NHL History\n• Great Goals of the Decade\n• NHL He's Not Human Moments\n\nShould I direct you to the Hockey section?";
        }

        // Baseball
        if (lowerMsg.includes('baseball') || lowerMsg.includes('mlb')) {
            return "Great baseball videos waiting for you:\n\n• Inside World Series Game 7\n• MLB Compilation of painful hits\n• MLB Unexpected Trick Compilation\n• Super Rare Moments\n\nWant to explore the Baseball section?";
        }

        // Badminton
        if (lowerMsg.includes('badminton')) {
            return "Exciting badminton content:\n\n• 10 Bad Habits To Avoid\n• 13 Skills for GREAT Players\n• Top 50 BULLET SMASHES\n• 1000% Skills Compilation\n\nLet me know if you want to see the Badminton section!";
        }

        // History
        if (lowerMsg.includes('history') || lowerMsg.includes('watched') || lowerMsg.includes('recent')) {
            return "Your watch history keeps track of all the videos you've watched. You can:\n\n• View all previously watched videos\n• Clear your watch history\n• Resume watching from where you left off\n\nWould you like me to take you to your History page?";
        }

        // Login/Account
        if (lowerMsg.includes('login') || lowerMsg.includes('sign in') || lowerMsg.includes('account')) {
            return "To access your account:\n\n1. Click the 'Login / Sign Up' button in the header\n2. Enter your email and password\n3. Or create a new account if you're new!\n\nYour watch history and preferences will be saved when logged in.";
        }

        // Help
        if (lowerMsg.includes('help') || lowerMsg.includes('how') || lowerMsg.includes('what can you')) {
            return "I can help you with:\n\n• Finding sports videos (basketball, football, hockey, baseball, badminton)\n• Navigating to different sections\n• Information about watch history\n• Account and login help\n• General questions about SportsTube\n\nWhat would you like to know?";
        }

        // Search
        if (lowerMsg.includes('search') || lowerMsg.includes('find')) {
            return "You can search for content using the search bar at the top! Just:\n\n1. Click the search box\n2. Start typing what you want\n3. See instant suggestions\n4. Click or press Enter to navigate\n\nTry searching for your favorite sport or player!";
        }

        // Trending/Popular
        if (lowerMsg.includes('trending') || lowerMsg.includes('popular') || lowerMsg.includes('best')) {
            return "Trending videos right now:\n\n• 1 in a Trillion Moments in Football\n• NBA Epic Moments\n• Best Dangles in NHL History\n• MLB Unexpected Tricks\n\nCheck out the Explore page to see all trending content!";
        }

        // Default response
        return "I'm here to help! I can assist you with:\n\n• Finding specific sports videos\n• Navigating to different sections\n• Information about watch history\n• Login and account help\n\nTry asking me about basketball, football, hockey, baseball, or badminton content!";
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SportsTubeChatbot();
});