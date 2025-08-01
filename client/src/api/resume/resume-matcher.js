import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const MAX_CV_LENGTH = 9000; // Slightly less than 10,000 to provide buffer

export const calculateMatch = async (jobData, cvText) => {
  try {
    // Truncate CV text if it's too long
    const truncatedCvText = cvText.length > MAX_CV_LENGTH 
      ? cvText.substring(0, MAX_CV_LENGTH) 
      : cvText;

    // Log the truncation if it occurs
    if (truncatedCvText.length !== cvText.length) {
      console.warn(`CV text truncated from ${cvText.length} to ${truncatedCvText.length} characters`);
    }

    const payload = {
      job: {
        title: jobData.title || '',
        description: jobData.description || '',
        company: jobData.company || 'Unknown',
        location: jobData.location || 'Not Specified',
        responsibilities: jobData.responsibilities || '',
        skills: jobData.skills || [],
        qualifications: jobData.qualifications || '',
        experience_years: jobData.experience_years || null
      },
      resume: {
        extracted_text: truncatedCvText,
        skills: jobData.skills || [], // Ensure skills are passed
        experience_years: jobData.experience_years || null
      }
    };

    // Log the constructed payload
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(`${BASE_URL}/match`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log the response
    console.log('Match Response:', JSON.stringify(response.data, null, 2));

    return response.data.match_percentage;
  } catch (error) {
    console.error("Error calculating match:", error);
    
    // Log detailed error information
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    
    return 0; // Return 0 if there's an error
  }
};