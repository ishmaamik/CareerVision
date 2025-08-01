import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

export const calculateMatch = async (jobData, cvText) => {
  try {
    const response = await axios.post(`${BASE_URL}/match`, {
      job: {
        title: jobData.title,
        description: jobData.description,
        company: jobData.company,
        location: jobData.location,
        responsibilities: jobData.responsibilities,
        skills: jobData.skills,
        qualifications: jobData.qualifications
      },
      resume: {
        extracted_text: cvText,
        skills: jobData.skills // Only compare against job skills
      }
    });
    return response.data.match_percentage;
  } catch (error) {
    console.error("Error calculating match:", error);
    return 0; // Return 0 if there's an error
  }
};