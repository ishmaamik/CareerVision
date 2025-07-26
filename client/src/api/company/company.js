import axios from "axios";

const BASE_URL = "http://localhost:8080/api/companies";

export const createCompany = async (jobData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCompany = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllCompanies`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

