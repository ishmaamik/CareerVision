import axios from 'axios'

const BASE_URL = `http://localhost:8080/api/applications`


export const applyForJob = async ({ userId, jobId }) => {
    try {
        const applied = axios.post(`${BASE_URL}/apply`, { userId: userId, jobId: jobId }, 
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


