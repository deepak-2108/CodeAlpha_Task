import os
import io
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from utils import preprocess_image
import string

app = Flask(__name__)
CORS(app)

# Model variables
DIGIT_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'mnist_cnn.keras')
LETTER_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'emnist_letters_cnn.keras')

digit_model = None
letter_model = None

def load_models():
    global digit_model, letter_model
    import keras
    try:
        if os.path.exists(DIGIT_MODEL_PATH):
            digit_model = keras.models.load_model(DIGIT_MODEL_PATH)
            print("Digit model loaded.")
        
        if os.path.exists(LETTER_MODEL_PATH):
            letter_model = keras.models.load_model(LETTER_MODEL_PATH)
            print("Letter model loaded.")
    except Exception as e:
        print(f"Error loading models: {e}")

load_models()

@app.route('/health', methods=['GET'])
def health_check():
    status = "healthy" if (digit_model is not None and letter_model is not None) else "model_missing"
    return jsonify({"status": status})

@app.route('/predict', methods=['POST'])
def predict():
    mode = request.form.get('mode', 'digits') # 'digits' or 'letters'
    
    model_to_use = digit_model if mode == 'digits' else letter_model
    
    if model_to_use is None:
        return jsonify({"error": f"{mode.capitalize()} model not loaded"}), 500
        
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
        
    file = request.files['image']
    image_bytes = file.read()
    
    processed_image = preprocess_image(image_bytes)
    
    if processed_image is None:
        return jsonify({"error": "Invalid image format"}), 400
        
    predictions = model_to_use.predict(processed_image)[0]
    top_indices = predictions.argsort()[-3:][::-1]
    
    results = []
    for idx in top_indices:
        if mode == 'digits':
            char = str(idx)
        else:
            # EMNIST Letters: 0-25 corresponds to A-Z
            char = string.ascii_uppercase[idx]
            
        results.append({
            "character": char,
            "confidence": float(predictions[idx] * 100)
        })
        
    response = {
        "prediction": results[0]['character'],
        "confidence": results[0]['confidence'],
        "top_3": results
    }
    
    return jsonify(response)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
