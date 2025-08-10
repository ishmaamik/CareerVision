import { getApplicationsByUser } from "./application/apply"
import { getCompanyFromName } from "./company/company"
import { getJobById } from "./job/job"
import axios from 'axios'


export const fetchCompany = async (setCompany, jobDetails) => {
    const company = await getCompanyFromName(jobDetails?.company)
    setCompany(company.company)
    console.log(company.company)
}

export const fetchJob = async ({param, setJobDetails, userId, setLoading, setHasApplied}) => {
    try {
        setLoading(true);
        console.log("Fetching job with ID:", param.id);
        const response = await getJobById(param.id);
        console.log("API Response:", response);

        if (response) {
            setJobDetails(response);

            if (userId && response?.id) {
                const applications = await getApplicationsByUser(userId);

                // Check if any application exists for this job
                const alreadyApplied = applications.some(app => app.job.id === response.id);
                setHasApplied(alreadyApplied);

            }
        } else {
            console.error("Empty response received");
        }
    } catch (error) {
        console.error("Error fetching job:", error);
    } finally {
        setLoading(false);
    }
};

// functions.js
export const fetchApplications = async (jobDetails) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/applications/job/${jobDetails.id}`);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};


export const updateMatchPercentage = async (applicationId, percentage) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/applications/${applicationId}/match-percentage`, 
            null, 
            { 
                params: { percentage } 
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating match percentage:', error);
        throw error;
    }
};



