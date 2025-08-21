import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { updateApplicationStatus } from '../../../redux/applicationsSlice';
import { fetchTopCandidates } from '../../../api/candidates/candidates.js';
import { PercentageBadge } from './PercentageBadge';
import { FaFilePdf } from 'react-icons/fa';

const TopCandidates = ({ jobId, jobDetails }) => { // Added jobDetails prop
    const [candidatesData, setCandidatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { list } = useSelector(state => state.applications);
    const dispatch = useDispatch(); // Added dispatch

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await fetchTopCandidates(jobId);
            setCandidatesData(data);
            setLoading(false);
        })();
    }, [jobId]);

    if (loading) return <p>Loading...</p>;

    // Filter full applications based on top candidates IDs
    const mergedCandidates = list
        .filter(app => candidatesData.some(c => c.applicationId === app.id))
        .map(app => {
            const extraData = candidatesData.find(c => c.applicationId === app.id);
            return {
                ...app,
                matchPercentage: extraData?.matchPercentage,
                distance: extraData?.distance,
                finalScore: extraData?.finalScore // Add finalScore from API
            };
        })
        // Sort by finalScore in descending order
        .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));

    if (!mergedCandidates.length) return <p>No candidates found.</p>;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="max-w-1000 bg-white w-full">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="py-3 px-4">Rank</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Applicant's Photo</th>
                        <th className="py-3 px-4">Applicant Resume</th>
                        <th className="py-3 px-4">Match %</th>
                        <th className="py-3 px-4">Final Score</th>
                        <th className="py-3 px-4">Distance (in km)</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mergedCandidates.map((app, index) => (
                        <tr key={app.id} className="border-b text-center">
                            <td className="py-3 px-4 font-bold">
                                #{index + 1}
                            </td>
                            <td className="py-3 px-4">{app.applicant?.name}</td>
                            <td className="py-3 px-4">{app.applicant?.email}</td>
                            <td className="py-3 px-4">
                                <img
                                    style={{ borderRadius: '50%', width:'100px'}}
                                    src={app.applicant?.profilePictureUrl || '/default-profile.jpg'}
                                    alt="profile"
                                />
                            </td>
                            <td className="py-3 px-4">
                                {app.applicant?.resumePath ? (
                                    <a
                                        href={app.applicant.resumePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center text-red-500 hover:text-red-700"
                                    >
                                        <FaFilePdf size={20} />
                                        <span className="ml-2">View Resume</span>
                                    </a>
                                ) : (
                                    <span className="text-gray-500">No resume</span>
                                )}
                            </td>
                            <td>
                                <PercentageBadge percentage={app.matchPercentage} />
                            </td>
                            <td className="py-3 px-4 font-bold text-lg">
                                {app.finalScore ? app.finalScore.toFixed(2) : 'N/A'}
                            </td>
                            <td className="py-3 px-4">{app.distance ? app.distance.toFixed(3) : 'N/A'}</td>
                            <td className="py-3 px-4">
                                <div className="flex flex-col space-y-2">
                                    <button 
                                        onClick={() => dispatch(updateApplicationStatus({
                                            applicationId: app.id,
                                            status: 'accepted',
                                            jobDetails
                                        }))}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => dispatch(updateApplicationStatus({
                                            applicationId: app.id,
                                            status: 'rejected',
                                            jobDetails
                                        }))}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopCandidates;