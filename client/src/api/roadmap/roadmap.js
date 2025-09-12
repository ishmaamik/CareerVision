import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/roadmap';

// Centralized error handler
const handleApiError = (error) => {
  console.group('Roadmap Generation API Error');
  console.error('Full Error Object:', error);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Error Response Data:', error.response.data);
    console.error('Error Response Status:', error.response.status);
    console.error('Error Response Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error Message:', error.message);
  }
  console.groupEnd();

  throw error;
};

export const generateRoadmap = async (payload) => {
  try {
    console.group('Roadmap Generation Request');
    console.log('Payload:', JSON.parse(JSON.stringify(payload))); // Deep clone to avoid proxy issues

    const response = await axios.post(`${BASE_URL}/generate`, payload, {
      headers: { 
        'Content-Type': 'application/json',
      },
      timeout: 30000 // 30 seconds timeout
    });

    console.log('Full Response:', response.data);
    console.log('Roadmap Content:', response.data.roadmap?.generatedRoadmap);
    console.groupEnd();

    // Validate response structure
    if (!response.data || !response.data.roadmap) {
      throw new Error('Invalid response structure from roadmap generation');
    }

    // Additional validation for roadmap content
    if (response.data.roadmap.generatedRoadmap === 'Placeholder roadmap content') {
      throw new Error('Roadmap generation failed: Received placeholder content');
    }

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRoadmapsByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getRoadmapById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
