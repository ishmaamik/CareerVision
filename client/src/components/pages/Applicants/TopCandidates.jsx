import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateApplicationStatus } from '../../../redux/applicationsSlice';
import { fetchTopCandidates } from '../../../api/candidates/candidates.js';
import { PercentageBadge } from './PercentageBadge';
import { FaFilePdf } from 'react-icons/fa';

const TopCandidates = ({ jobId}) => {
    const [candidatesData, setCandidatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { list } = useSelector(state => state.applications); // full applications list

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await fetchTopCandidates(jobId); // partial info
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
                distance: extraData?.distance
            };
        });

    if (!mergedCandidates.length) return <p>No candidates found.</p>;

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="max-w-1000 bg-white w-full">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Applicant's Photo</th>
                        <th className="py-3 px-4">Applicant Resume</th>
                        <th className="py-3 px-4">Match %</th>
                        <th className="py-3 px-4">Distance (in km)</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mergedCandidates.map(app => (
                        <tr key={app.id} className="border-b text-center">
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
                            <td className="py-3 px-4">{app.distance.toFixed(3)}</td>
                            <td>
                                        <button onClick={() => dispatch(updateApplicationStatus({
                                            applicationId: app.id,
                                            status: 'accepted',
                                            jobDetails
                                        }))}>
                                            Accept
                                        </button>
                                        <button onClick={() => dispatch(updateApplicationStatus({
                                            applicationId: app.id,
                                            status: 'rejected',
                                            jobDetails
                                        }))}>
                                            Reject
                                        </button>
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopCandidates;
