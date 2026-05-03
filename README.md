# InkMind AI

Turn handwriting into digital intelligence.

InkMind AI is a futuristic, premium SaaS web application that uses a Convolutional Neural Network (CNN) to recognize handwritten digits in real time.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios
- **Backend**: Python, Flask, TensorFlow/Keras
- **Machine Learning**: Convolutional Neural Network (MNIST dataset)

## Setup Instructions

### 1. Backend Setup

The backend requires Python 3.8+.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Train the model (This will download MNIST and save the model to `backend/model/`):
   ```bash
   python train.py
   ```
5. Run the Flask API server:
   ```bash
   python app.py
   ```
   The backend will start at `http://localhost:5000`.

### 2. Frontend Setup

The frontend requires Node.js.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the provided local URL (usually `http://localhost:5173`) in your browser.

## Deployment Guide

### Frontend (Netlify)
1. Push this repository to GitHub.
2. Log into Netlify and choose "Import from GitHub".
3. Select your repository.
4. Set Build Command to: `cd frontend && npm run build`
5. Set Publish Directory to: `frontend/dist`
6. Click Deploy.

### Backend (Render)
1. Log into Render and click "New Web Service".
2. Connect your GitHub repository.
3. Set the Root Directory to `backend`.
4. Set Build Command to: `pip install -r requirements.txt`
5. Set Start Command to: `gunicorn app:app`
6. Click Create Web Service.

*(Note: You will need to add `gunicorn` to your `requirements.txt` before deploying to Render).*

## Architecture Highlights
- **Real-time Canvas**: Interactive drawing canvas supporting both mouse and touch input.
- **Image Preprocessing**: Canvas strokes are converted to Blob, sent to backend, resized to 28x28 grayscale, normalized, and run through the CNN.
- **Glassmorphism UI**: Uses modern Tailwind styling with neon glow accents and Framer Motion micro-animations.
