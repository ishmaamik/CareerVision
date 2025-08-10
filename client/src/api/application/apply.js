import axios from 'axios'

const BASE_URL = `http://localhost:8080/api/applications`


export const applyForJob = async ({ userId, jobId, distance }) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/apply`, 
            { userId, jobId, distance }, 
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Full API response:', response); // Add this line
        return response.data;
    }
    catch (error) {
        console.error('Error applying for job:', error);
        throw error;
    }
}

export const getApplicationsByUser = async (userId) => {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data; // This returns the list of applications
};


export const fetchApplicationStatus = async ({userId, jobId, setApplicationStatus}) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/applications/user/${userId}`)
        const userApplications = response.data
        const currentJobApplication = userApplications.find(app => app.job?.id === jobId)
        if (currentJobApplication) {
            setApplicationStatus(currentJobApplication.status)
        } else {
            setApplicationStatus(null)
        }
    } catch (error) {
        console.error('Error fetching application status:', error)
    }
}


export const resumeForJob=async()=>{
    try {
        // Get the extracted text from CVData
        const response = await axios.get(
            `http://localhost:8080/api/resume/extract/${userId}`
        );
        const cvText = response.data.text;
        
        // Calculate match percentage
        const percentage = await calculateMatch(jobDetails, cvText);
        
        // Persist the match percentage
        await updateMatchPercentage(app.id, percentage);
        
        percentages[app.id] = percentage;
    } catch (err) {
        console.error(`Error calculating match for ${app.applicant.name}:`, err);
        percentages[app.id] = 0;
        
        // Store detailed error information
        errors[app.id] = err.response?.data?.error || 'Failed to calculate match';
    }
}