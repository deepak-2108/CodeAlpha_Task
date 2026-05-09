import os
import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

# Dictionary to store loaded models and scalers
models = {}
scalers = {}

def load_resources():
    for disease in ['heart', 'diabetes', 'cancer']:
        model_path = os.path.join(MODELS_DIR, f"{disease}_model.pkl")
        scaler_path = os.path.join(MODELS_DIR, f"{disease}_scaler.pkl")
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            with open(model_path, 'rb') as f:
                models[disease] = pickle.load(f)
            with open(scaler_path, 'rb') as f:
                scalers[disease] = pickle.load(f)
            print(f"Loaded {disease} model and scaler.")
        else:
            print(f"Warning: Could not find model or scaler for {disease}")

load_resources()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "loaded_models": list(models.keys())})

def get_prediction(disease, data):
    if disease not in models or disease not in scalers:
        return None, "Model or scaler not loaded"
    
    try:
        # Convert data to numpy array and reshape
        features = np.array(data).reshape(1, -1)
        
        # Check for NaN or Inf
        if np.isnan(features).any() or np.isinf(features).any():
            return None, "Input contains invalid numbers (NaN or Inf)"
        
        # Scale features
        scaled_features = scalers[disease].transform(features)
        
        # Get prediction and probability
        prediction = models[disease].predict(scaled_features)[0]
        probability = models[disease].predict_proba(scaled_features)[0]
        
        # Handle cases where probability might not be available or formatted differently
        # (SVM probability=True is used in training)
        prob_val = float(probability[1]) # Probability of class 1 (positive)
        
        result = {
            "prediction": int(prediction),
            "probability": prob_val,
            "risk_level": "High" if prob_val > 0.7 else "Medium" if prob_val > 0.3 else "Low",
            "model_used": type(models[disease]).__name__
        }
        return result, None
    except Exception as e:
        return None, str(e)

@app.route('/predict/<disease>', methods=['POST'])
def predict(disease):
    if disease not in ['heart', 'diabetes', 'cancer']:
        return jsonify({"error": "Invalid disease type"}), 400
    
    content = request.json
    if not content or 'features' not in content:
        return jsonify({"error": "No features provided"}), 400
    
    features = content['features']
    result, error = get_prediction(disease, features)
    
    if error:
        return jsonify({"error": error}), 500
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
