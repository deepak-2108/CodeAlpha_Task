# CodeAlpha Disease Prediction Project 🩺

A full-stack machine learning web application that predicts the probability of Heart Disease, Diabetes, and Breast Cancer based on user-provided medical data. 

This project was built as part of the CodeAlpha internship.

## 🌟 Features
* **Multi-Disease Prediction**: Three separate machine learning models tailored for Heart Disease, Diabetes, and Breast Cancer.
* **Modern UI/UX**: A responsive, health-tech dashboard built with React and Tailwind CSS.
* **Real-time Inference**: A fast Flask API that processes user input, scales it via `StandardScaler`, and returns probability predictions dynamically.
* **Pre-trained Models**: Includes fully trained `Logistic Regression`, `SVM`, and `Random Forest` models optimized on datasets from the UCI Machine Learning Repository.

## 🛠 Tech Stack
* **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
* **Backend**: Python, Flask, Flask-CORS
* **Machine Learning**: Scikit-Learn, Pandas, NumPy

## 🚀 How to Run Locally

### 1. Start the Backend API
Open a terminal and run the following commands to start the Flask server:
```bash
cd backend
pip3 install -r requirements.txt
python3 app.py
```
*The backend will run on `http://127.0.0.1:5001`*

### 2. Start the Frontend Application
Open a second terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
*Click the local URL shown in your terminal to open the app in your browser.*

## 🧠 Retraining the Models (Optional)
If you wish to retrain the models from scratch using the UCI datasets, you can run the machine learning pipeline:
```bash
cd ml_pipeline
pip3 install -r requirements-ml.txt
python3 train_models.py
```
This will automatically evaluate the best algorithm and save the new `.pkl` models to the `backend/models/` folder.

---
**Disclaimer**: This application is for educational purposes only and should not be used for actual medical diagnosis.
