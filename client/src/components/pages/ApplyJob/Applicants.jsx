import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FaFilePdf, FaEye } from 'react-icons/fa';
import { fetchApplications } from '../../../api/functions.js';
import { calculateMatch } from '../../../api/resume/resume-matcher.js'

// Percentage Badge Component
const PercentageBadge = ({ percentage, error }) => {
    if (error) {
        return (
            <span 
                className="text-red-500 text-xs" 
                title={error}
            >
                Error
            </span>
        );
    }

    // Determine gradient based on percentage
    const getGradientClass = () => {
        if (percentage >= 80) return 'from-purple-700 to-purple-900';
        if (percentage >= 60) return 'from-purple-600 to-purple-800';
        if (percentage >= 40) return 'from-purple-500 to-purple-700';
        if (percentage >= 20) return 'from-purple-400 to-purple-600';
        return 'from-purple-300 to-purple-500';
    };

    // Determine text and background classes for 0% case
    const is0Percent = percentage === 0;

    return (
        <div 
            className={`
                relative 
                w-full 
                h-6 
                ${is0Percent ? 'bg-gray-200' : 'bg-gray-200'} 
                rounded-full 
                overflow-hidden
                flex 
                items-center 
                justify-center
            `}
        >
            {is0Percent ? (
                <span className="text-black text-sm font-medium">
                    0%
                </span>
            ) : (
                <div 
                    className={`
                        absolute 
                        left-0 
                        top-0 
                        bottom-0 
                        bg-gradient-to-r 
                        ${getGradientClass()}
                        transition-all 
                        duration-500 
                        ease-out
                    `}
                    style={{ 
                        width: `${percentage}%`,
                        maxWidth: '100%'
                    }}
                >
                    <span 
                        className="
                            absolute 
                            right-2 
                            top-1/2 
                            transform 
                            -translate-y-1/2 
                            text-white 
                            font-semibold 
                            text-sm
                        "
                    >
                        {percentage}%
                    </span>
                </div>
            )}
        </div>
    );
};

const Applicants = ({ jobDetails, isMounted }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [matchPercentages, setMatchPercentages] = useState({});
    const [matchErrors, setMatchErrors] = useState({});

    useEffect(() => {
        if (jobDetails?.id) {
            fetchApplications({setLoading, setApplications, setError, jobDetails});
        }
    }, [jobDetails]);

    useEffect(() => {
        // Calculate match percentages when applications change
        const calculateMatches = async () => {
            const percentages = {};
            const errors = {};

            console.log('Total Applications:', applications.length);
            console.log('Job Details:', jobDetails);

            for (const app of applications) {
                console.log(`Processing Application ID: ${app.id}`);
                console.log('Applicant:', app.applicant);

                if (app.applicant?.resumePath) {
                    try {
                        // Get the extracted text from CVData
                        const response = await axios.get(
                            `http://localhost:8080/api/resume/extract/${app.applicant.id}`
                        );
                        const cvText = response.data.text;
                        
                        console.log(`CV Text for Applicant ${app.applicant.name}:`, 
                            `Length: ${cvText.length}, 
                            First 100 chars: ${cvText.substring(0, 100)}...`
                        );
                        
                        // Calculate match percentage
                        const percentage = await calculateMatch(jobDetails, cvText);
                        
                        console.log(`Match Percentage for ${app.applicant.name}: ${percentage}%`);
                        
                        percentages[app.id] = percentage;
                    } catch (err) {
                        console.error(`Error calculating match for ${app.applicant.name}:`, err);
                        percentages[app.id] = 0;
                        
                        // Store detailed error information
                        errors[app.id] = err.response?.data?.error || 'Failed to calculate match';
                    }
                } else {
                    console.log(`No resume path for Applicant ${app.applicant?.name}`);
                    percentages[app.id] = 0;
                }
            }
            
            console.log('Final Match Percentages:', percentages);
            console.log('Match Errors:', errors);
            
            setMatchPercentages(percentages);
            setMatchErrors(errors);
        };

        if (applications.length > 0) {
            calculateMatches();
        }
    }, [applications, jobDetails]);

    const updateApplicationStatus = async (applicationId, status) => {
        try {
            await axios.put(`http://localhost:8080/api/applications/${applicationId}/status`, null, {
                params: { status }
            });
            // Refresh the applications after update
            fetchApplications({setLoading, setApplications, setError, jobDetails});
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading applicants...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className={` transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2 flex items-center justify-center`}>
            <div className="mb-12 w-200 h-100 rounded-lg bg-white shadow-lg">
                <h2 className="text-2xl font-bold mb-6 p-4">Applicants for {jobDetails?.title}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-center">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Applicant Resume</th>
                                <th className="py-3 px-4 w-48">Percentage Match</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length > 0 ? (
                                applications.map((application) => (
                                    <tr key={application.id} className="border-b text-center">
                                        <td className="py-3 px-4">{application.applicant?.name}</td>
                                        <td className="py-3 px-4">{application.applicant?.email}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                application.status === 'accepted' ? 'text-green-900' :
                                                application.status === 'rejected' ? 'text-red-800' :
                                                application.status === 'pending' ? 'text-blue-800' :
                                                ' text-blue-800'
                                            }`}>
                                                {application.status === 'accepted' ? <p>Accepted </p> : (application.status === 'rejected' ? <p>  Rejected </p> : <p>Pending</p>) }
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {application.applicant?.resumePath ? (
                                                <a 
                                                    href={application.applicant.resumePath} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center text-red-500 hover:text-red-700"
                                                >
                                                    <FaFilePdf size={24} />
                                                    <span className="ml-2">View Resume</span>
                                                </a>
                                            ) : (
                                                <span className="text-gray-500">No resume</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 w-48">
                                            <PercentageBadge 
                                                percentage={matchPercentages[application.id] || 0} 
                                                error={matchErrors[application.id]} 
                                            />
                                        </td>
                                        <td className="py-3 px-4 w-60">
                                            <button
                                                onClick={() => updateApplicationStatus(application.id, 'accepted')}
                                                className="bg-green-500 text-black px-3 py-1 rounded mr-2 hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => updateApplicationStatus(application.id, 'rejected')}
                                                className="bg-red-500 text-black py-1 rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center text-gray-500">
                                        No applicants yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Applicants;