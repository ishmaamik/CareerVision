import { getApplicationsByUser } from "./application/apply"
import { getCompanyFromName } from "./company/company"
import { getJobById } from "./job/job"
import axios from 'axios'

export const fetchCompany = async (setCompany, jobDetails) => {
    const company = await getCompanyFromName(jobDetails?.company?.name)
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

// FIXED: Replace the old N+1 endpoint with the optimized filtered endpoint
export const fetchApplications = async (jobDetails) => {
    try {
        console.log('🟢 fetchApplications: Using OPTIMIZED filtered endpoint for job:', jobDetails.id);
        
        // Use the filtered endpoint with parameters to get ALL applications
        const response = await axios.get(`http://localhost:8080/api/applications/filtered`, {
            params: {
                jobId: jobDetails.id,
                filterType: 'all',        // Show all applications
                locationThreshold: 1000,  // Very high threshold to include all
                percentageThreshold: 0,   // Very low threshold to include all
                search: '',               // No search filter
                sortBy: 'percentage',     // Sort by match percentage
                limit: 100               // High limit to get all applications
            }
        });
        
        console.log('🟢 fetchApplications: Got', response.data.length, 'applications with JOIN FETCH');
        return response.data;
    } catch (err) {
        console.error('🔴 fetchApplications error:', err);
        throw new Error(err.message);
    }
};

// Alternative method using the with-applicant endpoint
export const fetchApplicationsWithApplicant = async (jobDetails) => {
    try {
        console.log('🟢 fetchApplicationsWithApplicant: Using with-applicant endpoint for job:', jobDetails.id);
        
        const response = await axios.get(`http://localhost:8080/api/applications/job/${jobDetails.id}/with-applicant`);
        
        console.log('🟢 fetchApplicationsWithApplicant: Got', response.data.length, 'applications');
        return response.data;
    } catch (err) {
        console.error('🔴 fetchApplicationsWithApplicant error:', err);
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