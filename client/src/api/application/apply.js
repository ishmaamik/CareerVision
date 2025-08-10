import axios from 'axios'

const BASE_URL = `http://localhost:8080/api/applications`


export const applyForJob = async ({ userId, jobId, distance }) => {
    try {
        const applied = axios.post(`${BASE_URL}/apply`, { userId: userId, jobId: jobId, distance: distance }, 
           { headers: {
                'Content-Type': 'application/json'
            }}
        )
        return applied
    }
    catch (error) {
        console.log(error)
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
