import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const predictDisease = async (disease, features) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict/${disease}`, {
      features: features
    });
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  const response = await axios.get(`${API_BASE_URL}/health`);
  return response.data;
};
