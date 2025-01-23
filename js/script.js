// Keep the code for handling navigation link clicks
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  });
});

// Create a dictionary of certificates
const certificates = {
  "Python Certificates": [
    "Advanced Python: Language Features",
    "AI Show: Building NLP models with Azure ML AutoML",
    "Building Computer Vision Applications with Python",
    "Building Tools with Python",
    "Choose the Right Tool for Your Data: Python, R, or SQL",
    "Hands-On Generative AI with Multi-Agent LangChain: Building Real-World Applications",
    "Hands-On Generative AI: Getting Started with Vector Search",
    "Hands-On Introduction: Python",
    "Hands-On PyTorch Machine Learning",
    "Intermediate Python",
    "Intermediate Python for Non-Programmers",
    "Introduction to Python",
    "Learning Python",
    "Machine Learning with Python: Foundations",
    "Nail Your Python Interview",
    "Python",
    "Python 3 Certification Course",
    "Python Certification Course",
    "Python Core",
    "Python Data Structures",
    "Python Essential Libraries",
    "Python Essential Training",
    "Python for Non-Programmers",
    "Python Functions for Data Science",
    "Python in Excel",
    "Python Object-Oriented Programming",
    "Python Standard Library Essential Training",
    "Python vs. R for Data Science",
    "Python For Data Science",
    "Python For Finance",
    "Programming Fundamentals Certification Course",
    "Using Python for Automation"
  ],
  "Artificial Intelligence Certificates": [
    "AI 2041: Five Visions for Our Future (Book Bite)",
    "AI Challenges and Opportunities for Leadership",
    "AI Engineering Essentials: Navigating the Tech Revolution",
    "AI Fundamentals for Data Professionals",
    "AI in Connected Products (AIOT)",
    "AI Pair Programming with GitHub Copilot",
    "AI Productivity Hacks to Reimagine Your Workday and Career",
    "AI Show: Applied AI - Computer Vision and Optical Character Recognition (OCR)",
    "AI Show: Building NLP models with Azure ML AutoML",
    "AI Show: Building Recommender Systems",
    "AI Show: Deep Dive into Responsible AI Dashboard and Scorecard",
    "AI Show: Easier, Faster Training for your Hugging Face Models",
    "AI Show: Intelligent Recommendations",
    "AI Show: Medical Imaging with Azure Machine Learning",
    "Artificial Intelligence",
    "Artificial Intelligence and Business Strategy",
    "Artificial Intelligence Artificial Intelligence",
    "Artificial Intelligence Foundations: Machine Learning",
    "Artificial Intelligence Foundations: Neural Networks",
    "Artificial Intelligence Foundations: Neural Networks",
    "Artificial Intelligence Foundations: Thinking Machines",
    "Azure AI Studio First Look",
    "Azure AI Tips for Developers: Securing Your Data",
    "Big Data in the Age of AI",
    "Building ChatGPT Plugins: How They Work and How to Use Them",
    "Building Computer Vision Applications with Python",
    "Building Generative AI Skills for Business Professionals",
    "Causal AI: A Tech Primer",
    "Copilot in Excel: Supercharge Your Productivity",
    "Copilot in Outlook: Maximize Your Workday Efficiency",
    "Copilot in PowerPoint: From Prompt to Presentation",
    "Copilot in Teams: AI-Powered Collaboration",
    "Copilot in Word: Create and Refine Documents with AI",
    "Crash Course For Python - Issued by Coursera",
    "Deep Learning: Getting Started",
    "Ethics in the Age of Generative AI",
    "Executive Guide to AutoML",
    "Exploring AIOps",
    "Fine-tuning Your Own GPT Model",
    "Function Calling with the OpenAI API",
    "Generative AI Approaches to Business Challenges",
    "Generative AI for Business Leaders",
    "Generative AI for Creative Pros: Opportunities, Issues, and Ethics",
    "Generative AI in Cloud Computing: Core Concepts",
    "Generative AI Productivity Hacks with Miss Excel",
    "Generative AI vs. Traditional AI",
    "Generative AI: Working with Large Language Models",
    "Getting Hands-on with GPT-4: Tips and Tricks",
    "Getting Started with AI and Machine Learning",
    "GPT-4 Foundations: Building AI-Powered Apps",
    "GPT-4: The New GPT Release and What You Need to Know",
    "Hands-On Generative AI with Multi-Agent LangChain: Building Real-World Applications",
    "Hands-On Generative AI: Getting Started with Vector Search",
    "Hands-On PyTorch Machine Learning",
    "How to Boost Your Productivity with AI Tools",
    "How to Research and Write Using Generative AI Tools",
    "Introduction to Artificial Intelligence",
    "Introduction to Generative Adversarial Networks (GANs)",
    "Introduction to Large Language Models",
    "Introduction to Prompt Engineering for Generative AI",
    "IT Basics - Issued by Programming Hub",
    "Learning XAI: Explainable Artificial Intelligence",
    "LinkedIn AI Academy AI-100: 1 Demystifying AI",
    "Machine Learning and AI Foundations: Classification Modeling",
    "Machine Learning and AI Foundations: Prediction, Causation, and Statistical Inference",
    "Machine Learning and AI Foundations: Recommendations",
    "Machine Learning and AI Foundations: Value Estimations",
    "Machine Learning Foundations: Linear Algebra",
    "Machine Learning Foundations: Statistics",
    "Machine Learning with Python: Foundations",
    "Magic ToDo: An AI Tool to Make Complex Projects Simpler",
    "Microsoft 365 Chat: Get Secure Answers About Your Organization with AI",
    "Microsoft 365 Copilot First Look",
    "Midjourney: Tips and Techniques for Creating Images",
    "Multimodal Prompting with Google's Project Gemini",
    "Nano Tips for Using AI in the Job Search with Sho Dewan",
    "Nano Tips for Using ChatGPT for Business with Rachel Woods",
    "Nano Tips for Using Generative AI Tools for Better Marketing Outcomes with Joanna Yung",
    "No-Code AI: Building Your First Model",
    "Pair Programming with AI",
    "Powerful Custom GPTs You Can Build Right Now",
    "Prompt Engineering: How to Talk to the AIs",
    "Prompting ChatGPT with Multimodal Techniques",
    "RPA, AI, and Cognitive Tech for Leaders",
    "Safeguarding AI",
    "Software Is Eating Your Car",
    "Streamlining Your Work with Microsoft Copilot",
    "Supercharge Your Productivity with ChatGPT Plugins",
    "Tech For Everyone - Issued by Sololearn",
    "Technical Support Fundamentals - Issued by Coursera",
    "The Datapreneurs: How People Are Shaping the Future of AI (Book Bite)",
    "The Power of Accurate Prompting with Anthropic’s Claude",
    "Top 10 Skills for AI Engineer/AI Ops Engineers",
    "Top 10 Skills for AI Systems Designers",
    "Top 10 Skills for Machine Learning Cloud Architects",
    "Top 10 Skills for NLP Specialists",
    "Understanding Bias in AI",
    "What Is Generative AI?",
    "What is Copilot? Get Started with Microsoft's Everyday AI Companion"
  ],
  "SQL Certificates": [
    "SQL",
    "Introduction To SQL",
    "SQL Intermediate",
    "Choose the Right Tool for Your Data: Python, R, or SQL",
    "Programming Foundations: Databases",
    "Learning SQL Programming"
  ],
  "HTML/CSS/Javascript Certificates": [
    "Cutting-Edge CSS",
    "HTML Essential Training",
    "CSS Essential Training (2019)",
    "JavaScript Essential Training"
  ],
  "Advanced Certificates": [
    "AWS Academy Graduate - AWS Academy Cloud Foundations",
    "Google Share Data Through the Art of Visualization Issuing Organization",
    "Google Foundations: Data, Data, Everywhere",
    "Google Data Analysis with R Programming",
    "Google Prepare Data for Exploration",
    "Google Process Data from Dirty to Clean",
    "Google Data Analytics Certificate",
    "Google Data Analytics Specialization",
    "Google Data Analytics Capstone: Complete a Case Study"
  ],
  "Software Certificates": [
    "AWS Academy Graduate - AWS Academy Cloud Foundations",
    "AI Show: Medical Imaging with Azure Machine Learning",
    "AI Show: Building NLP models with Azure ML AutoML",
    "Azure AI Studio First Look",
    "Azure AI Tips for Developers: Securing Your Data",
    "Everybody's Introduction to Snowflake",
    "Learning SnowflakeDB"
  ],
  "Cloud Certificates": [
    "AWS Academy Graduate - AWS Academy Cloud Foundations",
    "Google Cloud Foundations",
    "Choosing a Database: PostgreSQL, MySQL, Mongo, and Cloud",
    "Learning Cloud Computing: Core Concepts",
    "Cloud Architecture: Core Concepts",
    "Generative AI in Cloud Computing: Core Concepts",
    "Top 10 Skills for Machine Learning Cloud Architects"
  ]

  // Add more categories as needed
};

// Flatten the dictionary into an array of certificate names
const certificateNames = Object.values(certificates).flat();

// Get the search input field and results container
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

// Listen for input event
searchInput.addEventListener('input', function() {
  // Clear previous results
  searchResults.innerHTML = '';

  // Get the current input value
  const inputValue = this.value.toLowerCase();

  // Filter certificates
  const matchingCertificates = [];
  for (const category in certificates) {
    for (const certificate of certificates[category]) {
      if (certificate.toLowerCase().includes(inputValue)) {
        matchingCertificates.push({ name: certificate, category: category });
      }
    }
  }

  // Display matching certificates
  matchingCertificates.forEach(certificate => {
    const resultItem = document.createElement('div');
    resultItem.textContent = `${certificate.name} (Category: ${certificate.category})`;
    searchResults.appendChild(resultItem);
  });

  // Show search results
  searchResults.style.display = 'block';
});

// Hide search results when the search input loses focus
searchInput.addEventListener('blur', function() {
  setTimeout(() => searchResults.style.display = 'none', 200);
});

// Keep the code for the copyToClipboard function
function copyToClipboard(elementId) {
  var copyText = document.getElementById(elementId).innerText;
  var textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
  alert("Copied: " + copyText); // This line is optional, it's just to give immediate feedback
}

// Keep the code for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Select all the elements you want to animate
const skillBoxes = document.querySelectorAll('.skill-box');
const timelinePoints = document.querySelectorAll('.point');

// Create a new Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // If the element is intersecting, add the 'show' class
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.1 // Adjust this value to control when the callback is called
});

// Observe all the selected elements
skillBoxes.forEach(box => observer.observe(box));
timelinePoints.forEach(point => observer.observe(point));
