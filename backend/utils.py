import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes):
    """
    Preprocess the incoming image bytes to match the MNIST training data format:
    - Grayscale
    - 28x28 pixels
    - Invert colors (white digit on black background)
    - Normalize pixel values to [0, 1]
    - Reshape to (1, 28, 28, 1) for the CNN
    """
    try:
        # Load image
        img = Image.open(io.BytesIO(image_bytes)).convert('L') # Convert to grayscale
        
        # Resize to 28x28
        img = img.resize((28, 28), Image.Resampling.LANCZOS)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Invert colors if necessary (MNIST is white on black, drawing canvas might be black on white)
        # We assume drawing canvas provides a white background with black drawing
        img_array = 255 - img_array
        
        # Normalize to [0, 1]
        img_array = img_array.astype('float32') / 255.0
        
        # Reshape to (1, 28, 28, 1) to match input shape of model
        img_array = np.expand_dims(img_array, axis=0)
        img_array = np.expand_dims(img_array, axis=-1)
        
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None
