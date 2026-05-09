MASTER PROMPT — Disease Prediction Web Application
1. Role & Objective
Act as a Senior Machine Learning Engineer + Full-Stack Developer + Product Designer.
Your task is to design and generate a production-ready, portfolio-grade AI healthcare web application called MediPredict AI that predicts the probability of diseases using patient medical data.
The product must look like a professional health-tech SaaS platform, not a student demo.
2. Core Product Vision
Build an intelligent medical decision-support tool that helps users estimate disease risk based on structured medical inputs.
Primary Goal
Predict disease probability from patient data.
Prediction Targets
Heart Disease
Diabetes
Breast Cancer
Approach
Supervised machine learning classification on structured datasets.
3. Datasets
Use datasets from the UCI Machine Learning Repository:
Heart Disease Dataset
Diabetes Dataset
Breast Cancer Dataset
Each dataset must be cleaned, preprocessed, and standardized.
4. Machine Learning Requirements
Algorithms to Implement
Train and compare multiple models:
Logistic Regression
Support Vector Machine (SVM)
Random Forest
XGBoost
Model Workflow
Data preprocessing
Feature scaling / encoding
Model training
Model evaluation
Best model selection
Model serialization (pickle)
Evaluation Metrics
Show:
Accuracy
Precision
Recall
F1 Score
Confusion Matrix
5. Tech Stack Requirements
Frontend
React
Tailwind CSS
Framer Motion
Axios
Backend
Python Flask API
REST endpoints returning JSON
CORS enabled
ML Libraries
Scikit-learn
XGBoost
Pandas
NumPy
Deployment Targets
Frontend → Netlify
Backend → Render
6. UI/UX Design Philosophy
Create a modern health-tech dashboard.
Visual Theme
Dark + light mode support
Primary color: Medical blue
Accent color: Emerald green gradient
Clean cards and dashboards
Subtle animations and transitions
Typography
Headings → Poppins
Body → Inter
The UI must feel trustworthy, clean, and professional.
7. Landing Page Structure
Navbar
Include:
Logo: MediPredict AI
Links: Home, Predict, Models, About
Login / Signup UI (mock auth)
Hero Section
Tagline:
“Predict disease risk before symptoms appear.”
Include:
Medical illustration / animation
Primary CTA → Start Prediction
8. Core Feature — Disease Prediction Dashboard
Create a multi-disease prediction interface.
Disease Selector Tabs
Heart Disease
Diabetes
Breast Cancer
Switching tabs updates input form dynamically.
9. Prediction Forms
Heart Disease Inputs (example)
Age
Sex
Chest pain type
Blood pressure
Cholesterol
Max heart rate
Exercise induced angina
Diabetes Inputs
Glucose level
BMI
Insulin
Age
Pregnancies
Breast Cancer Inputs
Radius mean
Texture mean
Perimeter mean
Area mean
Smoothness
Use sliders, dropdowns, and numeric inputs.
10. Prediction Experience
When user clicks Predict Risk:
Show loading animation
Call backend API
Display prediction results
Results Must Show
Risk level (Low / Medium / High)
Probability percentage
Model used for prediction
Confidence visualization (gauge chart)
Health tips suggestion box
“Predict Again” button
11. Model Insights Page
Create a dashboard showing model comparison.
Include:
Accuracy comparison bar chart
Confusion matrix visualization
Feature importance chart (Random Forest / XGBoost)
12. Backend API Requirements
Model Handling
Load trained models at startup
Separate model per disease
Fast inference
Input validation
API Endpoints
/predict/heart
/predict/diabetes
/predict/cancer
/health
Return structured JSON responses.
13. Extra UX Enhancements
Add:
Toast notifications
Tooltips explaining medical terms
Accessibility support (ARIA labels)
Light/Dark theme toggle with localStorage
Loading skeleton UI
404 error page
14. Code Quality Requirements
Provide:
Clean modular architecture
Reusable React components:
Navbar
PredictionForm
ResultCard
Charts
Footer
Environment variables
requirements.txt
Comments explaining logic
15. Documentation & Deliverables
Generate:
Full project folder structure
README.md
Data preprocessing scripts
Model training notebooks/scripts
Setup instructions
Production build steps
Deployment guide (Render + Netlify)
16. Final Product Expectation
The finished application must:
Look like a real health-tech startup product
Be visually polished and professional
Be portfolio-ready
Demonstrate ML + full-stack skills clearly