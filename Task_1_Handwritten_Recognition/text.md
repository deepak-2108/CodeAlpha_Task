1. Role & Objective
Act as a Senior AI Engineer + Senior Frontend Engineer + Product Designer.
Your task is to design and generate a production-ready, portfolio-grade web application called InkMind AI that recognizes handwritten characters in real time using deep learning.
The application must feel like a premium SaaS product, not a student project.
2. Core Product Vision
Build a futuristic AI web app that converts handwriting into digital intelligence.
Primary Goal
Recognize handwritten digits and alphabets in real time.
Datasets
MNIST (digits)
EMNIST (letters)
Model Requirement
Convolutional Neural Network (CNN)
Architecture must be extendable to CRNN for full word recognition later.
3. Tech Stack Requirements
Frontend
React (component-based architecture)
Tailwind CSS (styling)
Framer Motion (animations)
Axios (API calls)
Backend
Python Flask API
REST endpoints
JSON responses
CORS enabled
Machine Learning
TensorFlow / Keras
Pretrained CNN model
Image preprocessing pipeline (28×28 grayscale, normalization)
Deployment Targets
Frontend → Netlify
Backend → Render
4. UI/UX Design Philosophy
Visual Style
Create a futuristic, startup-level SaaS interface.
Use:
Dark theme by default
Neon blue primary color
Violet gradient accents
Glassmorphism UI cards
Soft shadows + glowing borders
Subtle particle/grid animated background
Typography
Headings → Poppins
Body text → Inter
Motion & Interaction
Micro-animations everywhere
Smooth page transitions
Hover glow effects
Scroll-triggered animations
The UI must feel memorable and premium.
5. Landing Page Structure
Navbar
Include:
Logo: InkMind AI
Links: Home, Demo, How It Works, About
Login / Signup buttons
Blur glass effect navbar
Hero Section
Include:
Tagline: “Turn handwriting into intelligence.”
Animated neural network background
Primary CTA: Try Live Demo
6. Core Feature — Live Recognition Demo
Drawing Canvas
Provide an interactive canvas that supports:
Mouse drawing
Touch drawing (mobile support)
Brush size control
Undo button
Clear canvas button
Keyboard shortcuts:
Press C → Clear canvas
Press P → Predict
Image Upload
Allow drag-and-drop image upload:
Accept JPEG/PNG/JPG
Show preview before prediction
7. Prediction Experience
When user clicks Predict:
Show loading animation
Call backend API
Display results in a glowing result card
Results Must Show
Predicted character (large typography)
Confidence percentage
Top 3 predictions
Animated probability bar chart
“Try Again” button
Confetti success animation
Download image button
Share result button
8. How It Works Section
Explain pipeline visually using icons:
Draw or upload image
Image preprocessing
CNN prediction
Result visualization
Add scroll animations and feature cards.
9. Backend API Requirements
Model Handling
Load model at startup
Cache model in memory
Optimize inference speed
API Endpoints
/predict
Accept image
Preprocess image
Run model prediction
Return JSON result
/health
Return server status
Error Handling
Handle invalid images
Return proper HTTP responses
10. Extra UX Enhancements
Add:
Toast notifications
Tooltip hints
Loading skeleton UI
404 page
Accessibility (ARIA labels)
Light/Dark mode toggle
Theme persistence using localStorage
11. Code Quality Requirements
Provide:
Clean modular architecture
Reusable React components:
Navbar
Hero
Canvas
Upload
ResultCard
Footer
Comments explaining key logic
Environment variables support
requirements.txt
12. Documentation & Deliverables
Generate:
Complete folder structure
README.md
Model training script
Image preprocessing script
Setup instructions
Production build steps
Deployment guide (Render + Netlify)
13. Final Product Expectation
The finished project must:
Look startup-level
Be visually memorable
Be portfolio-ready
Feel delightful and premium
Showcase AI + Full-Stack skills professionally