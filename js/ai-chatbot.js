// AI Chatbot Widget - Powered by Hugging Face Inference API
// Free AI assistant to help visitors navigate the portfolio

class PortfolioChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    console.log('AI Chatbot initialized successfully');
  }

  createChatWidget() {
    // Create chatbot HTML
    const chatbotHTML = `
      <div id="ai-chatbot-container">
        <!-- Floating Button -->
        <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open AI Assistant">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="chatbot-badge">AI</span>
        </button>

        <!-- Chat Window -->
        <div id="chatbot-window" class="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-header-content">
              <div class="chatbot-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3>Nick's AI Assistant</h3>
                <p class="chatbot-status">
                  <span class="status-dot"></span> Online
                </p>
              </div>
            </div>
            <button id="chatbot-close" class="chatbot-close-btn" aria-label="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div id="chatbot-messages" class="chatbot-messages">
            <div class="message bot-message">
              <div class="message-avatar">AI</div>
              <div class="message-content">
                <p>👋 Hi! I'm Nick's AI assistant. I can help you navigate this portfolio and answer questions about Nick's experience, projects, and skills.</p>
                <p>Try asking me things like:</p>
                <ul>
                  <li>"What projects has Nick worked on?"</li>
                  <li>"Tell me about Nick's AI experience"</li>
                  <li>"Where can I find his certificates?"</li>
                  <li>"What programming languages does Nick know?"</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="chatbot-input-container">
            <textarea 
              id="chatbot-input" 
              class="chatbot-input" 
              placeholder="Ask me anything about Nick's portfolio..."
              rows="1"
            ></textarea>
            <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    // Inject into body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Inject styles
    this.injectStyles();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #ai-chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .chatbot-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d9ff, #a855f7);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
        color: white;
      }

      .chatbot-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(0, 217, 255, 0.6);
      }

      .chatbot-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #f59e0b;
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.5);
      }

      .chatbot-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 550px;
        max-height: calc(100vh - 140px);
        background: rgba(26, 26, 46, 0.98);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid rgba(0, 217, 255, 0.2);
      }

      .chatbot-window.open {
        display: flex;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .chatbot-header {
        background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(168, 85, 247, 0.1));
        padding: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-header-content {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .chatbot-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d9ff, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .chatbot-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: white;
      }

      .chatbot-status {
        margin: 2px 0 0 0;
        font-size: 12px;
        color: #a0aec0;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #10b981;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .chatbot-close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.2s ease;
      }

      .chatbot-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }

      .chatbot-messages::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }

      .chatbot-messages::-webkit-scrollbar-thumb {
        background: rgba(0, 217, 255, 0.3);
        border-radius: 3px;
      }

      .message {
        display: flex;
        gap: 12px;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d9ff, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
        flex-shrink: 0;
      }

      .user-message .message-avatar {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
      }

      .message-content {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        padding: 12px 16px;
        border-radius: 12px;
        color: white;
        font-size: 14px;
        line-height: 1.6;
      }

      .message-content p {
        margin: 0 0 8px 0;
      }

      .message-content p:last-child {
        margin-bottom: 0;
      }

      .message-content ul {
        margin: 8px 0 0 0;
        padding-left: 20px;
      }

      .message-content li {
        margin: 4px 0;
        color: #a0aec0;
      }

      .message-content a {
        color: #00d9ff;
        text-decoration: none;
        font-weight: 600;
      }

      .message-content a:hover {
        text-decoration: underline;
      }

      .user-message .message-content {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
      }

      .typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00d9ff;
        animation: typing 1.4s infinite;
      }

      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          opacity: 0.3;
          transform: translateY(0);
        }
        30% {
          opacity: 1;
          transform: translateY(-10px);
        }
      }

      .chatbot-input-container {
        padding: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 12px;
        background: rgba(0, 0, 0, 0.2);
      }

      .chatbot-input {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 12px 16px;
        color: white;
        font-size: 14px;
        font-family: inherit;
        resize: none;
        max-height: 120px;
        transition: all 0.2s ease;
      }

      .chatbot-input:focus {
        outline: none;
        border-color: #00d9ff;
        background: rgba(255, 255, 255, 0.08);
      }

      .chatbot-input::placeholder {
        color: #6b7280;
      }

      .chatbot-send-btn {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: linear-gradient(135deg, #00d9ff, #a855f7);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.2s ease;
      }

      .chatbot-send-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
      }

      .chatbot-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .chatbot-window {
          width: calc(100vw - 40px);
          height: calc(100vh - 140px);
          bottom: 80px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');

    if (!toggleBtn || !closeBtn || !sendBtn || !input) {
      console.error('Chatbot elements not found. Retrying in 100ms...');
      setTimeout(() => this.attachEventListeners(), 100);
      return;
    }

    console.log('Attaching event listeners to chatbot elements');

    toggleBtn.addEventListener('click', () => {
      console.log('Toggle button clicked');
      this.toggleChat();
    });
    closeBtn.addEventListener('click', () => this.toggleChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('chatbot-window');
    
    if (this.isOpen) {
      chatWindow.classList.add('open');
    } else {
      chatWindow.classList.remove('open');
    }
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Show typing indicator
    this.showTypingIndicator();

    // Get AI response
    const response = await this.getAIResponse(message);
    
    // Remove typing indicator
    this.hideTypingIndicator();

    // Add bot response
    this.addMessage(response, 'bot');
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? 'You' : 'AI';
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        ${text}
      </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-content">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async getAIResponse(userMessage) {
    // This is a rule-based system - you can integrate with Hugging Face API if needed
    const lowerMessage = userMessage.toLowerCase();
    
    // Portfolio navigation responses
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return `<p>Nick has worked on several impressive projects! You can view all his projects on the <a href="/my_templates/projects.html">Projects page</a>.</p>
              <p>Some highlights include:</p>
              <ul>
                <li><strong>AI Resume Navigator</strong> - Advanced recruitment platform (January 2025)</li>
                <li><strong>AI Chatbot</strong> for company website (March 2024)</li>
                <li><strong>Government Contract</strong> - AI/ML courses for CMS users</li>
                <li><strong>IMLS Data Analysis</strong> - Museum & library data on AWS</li>
              </ul>`;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('language') || lowerMessage.includes('technology')) {
      return `<p>Nick is proficient in many technologies! Check out the <a href="/my_templates/about.html">About page</a> for the complete list.</p>
              <p>Key skills include:</p>
              <ul>
                <li><strong>AI/ML:</strong> TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision</li>
                <li><strong>Languages:</strong> Python, SQL, JavaScript, C++, HTML/CSS</li>
                <li><strong>Cloud:</strong> AWS, Azure, Databricks, Snowflake</li>
                <li><strong>Web:</strong> React, Flask, Django, Node.js</li>
              </ul>`;
    }
    
    if (lowerMessage.includes('certificate') || lowerMessage.includes('cert')) {
      return `<p>Nick has completed over <strong>460+ certifications</strong>! 🎓</p>
              <p>You can view all his certificates on the <a href="/my_templates/certificates.html">Certificates page</a>.</p>
              <p>These cover AI, ML, data science, cloud computing, web development, and more!</p>`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return `<p>Nick is currently a <strong>Data/AI Engineer at JOS Group</strong>, working on federal contracts.</p>
              <p>His career highlights include:</p>
              <ul>
                <li>First Python Developer job (April 2023)</li>
                <li>Government contracts with CMS and IMLS</li>
                <li>Specialized in AI/ML since November 2022</li>
                <li>Daily learning commitment since April 2022</li>
              </ul>
              <p>View his full timeline on the <a href="/my_templates/about.html">About page</a>!</p>`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return `<p>You can contact Nick through:</p>
              <ul>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nick-holmes-90264a217/" target="_blank">Connect here</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/NickHolmes999" target="_blank">Check repositories</a></li>
                <li><strong>Email:</strong> learncodewithnick@gmail.com</li>
                <li><strong>Phone:</strong> 301-500-5152</li>
              </ul>
              <p>Or use the contact form on the <a href="/my_templates/contact.html">Contact page</a>!</p>`;
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
      return `<p>Nick specializes in AI and Machine Learning! He's been working with AI daily since November 2022.</p>
              <p>His AI expertise includes:</p>
              <ul>
                <li>Natural Language Processing (NLP)</li>
                <li>Computer Vision</li>
                <li>Generative AI & LLMs</li>
                <li>Deep Learning (TensorFlow, PyTorch)</li>
                <li>ML Pipeline Development</li>
                <li>AutoML (Microsoft, Databricks)</li>
              </ul>
              <p>Check out his <a href="/my_templates/projects.html">AI projects</a> and <a href="/my_templates/services-faq.html">Services FAQ</a>!</p>`;
    }
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('download')) {
      return `<p>You can download Nick's resume directly from the homepage!</p>
              <p>There's a "Download Resume" button in the contact info section.</p>
              <p>You can also find it on the <a href="/">Home page</a>.</p>`;
    }
    
    if (lowerMessage.includes('showcase') || lowerMessage.includes('interactive') || lowerMessage.includes('demo')) {
      return `<p>Want to see Nick's interactive demos? Check out the <a href="/my_templates/interactive-showcase.html">Interactive Showcase</a>!</p>
              <p>It features:</p>
              <ul>
                <li>Typing Speed Test</li>
                <li>Color Mixer Tool</li>
                <li>Functional Calculator</li>
                <li>Password Generator</li>
                <li>Todo List Manager</li>
                <li>JSON Formatter</li>
                <li>Plus a cool Matrix rain background! 🎯</li>
              </ul>`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `<p>Hello! 👋 I'm Nick's AI assistant. How can I help you today?</p>
              <p>I can help you:</p>
              <ul>
                <li>Navigate to different sections</li>
                <li>Learn about Nick's skills and experience</li>
                <li>Find contact information</li>
                <li>Discover his projects and achievements</li>
              </ul>
              <p>What would you like to know?</p>`;
    }
    
    // Default response
    return `<p>I can help you learn more about Nick Holmes and his portfolio!</p>
            <p>Try asking me about:</p>
            <ul>
              <li>His projects and work experience</li>
              <li>Technical skills and certifications</li>
              <li>AI and machine learning expertise</li>
              <li>How to contact him</li>
              <li>Where to find specific information</li>
            </ul>
            <p>You can also explore:</p>
            <ul>
              <li><a href="/my_templates/about.html">About Page</a></li>
              <li><a href="/my_templates/projects.html">Projects</a></li>
              <li><a href="/my_templates/services-faq.html">Services FAQ</a></li>
              <li><a href="/my_templates/interactive-showcase.html">Interactive Showcase</a></li>
            </ul>`;
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioChatbot();
});
