import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/interview-questions/comments';

export const addComment = async (questionId, userId, content, parentCommentId = null, isAnonymous = false) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, null, {
      params: {
        questionId,
        userId,
        content,
        parentCommentId,
        isAnonymous
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionComments = async (questionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/question/${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommentReplies = async (commentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/replies/${commentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const voteComment = async (commentId, voteType) => {
  try {
    const response = await axios.post(`${BASE_URL}/vote/${commentId}`, null, {
      params: { voteType }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopLikedComments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-liked`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
