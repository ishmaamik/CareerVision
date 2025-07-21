import axios from "axios";

const BASE_URL = "http://localhost:8080/api/jobs";

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobsByRecruiter = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/by/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
