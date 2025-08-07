import axios from "axios";

const BASE_URL = "http://localhost:8080/api/careers";

// Create a new career profile
export const createCareer = async (careerData) => {
  try {
    const response = await axios.post(BASE_URL, careerData);
    return response.data;
  } catch (error) {
    console.error("Error creating career:", error);
    throw error;
  }
};

// Get all career profiles
export const getAllCareers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching careers:", error);
    throw error;
  }
};

// Get a career profile by ID
export const getCareerById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching career with id ${id}:`, error);
    throw error;
  }
};

// Update a career profile
export const updateCareer = async (id, careerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, careerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating career with id ${id}:`, error);
    throw error;
  }
};

// Delete a career profile
export const deleteCareer = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting career with id ${id}:`, error);
    throw error;
  }
};
