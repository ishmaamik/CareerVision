import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/interview-questions';

export const uploadInterviewQuestionPDF = async (companyId, questionId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('questionId', questionId);

  try {
    const response = await axios.post(`${BASE_URL}/upload-pdf/${companyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addInterviewQuestion = async (companyId, questionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add/${companyId}`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyInterviewQuestions = async (companyId, filters = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/company/${companyId}`, { 
      params: filters 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const voteInterviewQuestion = async (questionId, voteType) => {
  try {
    const response = await axios.post(`${BASE_URL}/vote/${questionId}`, null, {
      params: { voteType }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopRatedQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-rated`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
