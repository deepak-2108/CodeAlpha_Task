import axios from 'axios';

// Backend is running on port 5001 by default during local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const predictImage = async (imageBlob, mode = 'digits') => {
  const formData = new FormData();
  formData.append('image', imageBlob, 'drawing.png');
  formData.append('mode', mode);
  
  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Prediction error:", error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
};
