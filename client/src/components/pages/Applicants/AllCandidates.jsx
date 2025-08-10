import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateApplicationStatus } from '../../../redux/applicationsSlice';
import { FaFilePdf } from 'react-icons/fa'
import { PercentageBadge } from './PercentageBadge';

const AllCandidates = ({ jobDetails }) => {
    const [isMounted, setMounted] = useState(false)
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector(state => state.applications);
    const { matchPercentages, matchErrors } = useSelector(state => state.percentages);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50)
        return () => {
            setMounted(false)
            clearTimeout(timer)
        }
    }, [])

    return (
        <>
            <div className={`
            transform 
            ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} 
            transition-all 
            duration-800 
            ease-in-out 
            pb-12
        `}>
                <div className="
                w-full 
                max-w-800
                px-0 
                mb-12 
                rounded-lg 
                bg-white 
                shadow-lg 
                overflow-hidden 
                
            ">
                    <table className=" max-w-1000 bg-white ">
                        <thead>
                            <tr className="bg-white text-center">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Applicant's Photo</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Applicant Resume</th>
                                <th className="py-3 px-4">Percentage Match</th>
                                <th className="py-3 px-4">Distance (in km)</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length > 0 ?
                                (
                                    list.map(application => (
                                        <tr key={application.id}>
                                            <td className="py-3 px-4">{application.applicant?.name}</td>
                                            <td className="py-3 px-4">{application.applicant?.email}</td>
                                            <td className="py-3 px-4"><img style={{ borderRadius: '50%' }} src={application.applicant?.profilePictureUrl || '/default-profile.jpg'} /></td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${application.status === 'accepted' ? 'text-green-900' :
                                                    application.status === 'rejected' ? 'text-red-800' :
                                                        application.status === 'pending' ? 'text-blue-800' :
                                                            ' text-blue-800'
                                                    }`}>
                                                    {application.status === 'accepted' ? <p>Accepted </p> : (application.status === 'rejected' ? <p>  Rejected </p> : <p>Pending</p>)}
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
                                            <td>
                                                <PercentageBadge
                                                    percentage={application.matchPercentage ?? matchPercentages[application.id] ?? 0}
                                                    error={matchErrors[application.id]}
                                                />
                                            </td>
                                            <td className="py-3 px-4 justify-center items-center">
                                                {typeof application?.distance === "number"
                                                    ? application.distance === 0
                                                        ? 0
                                                        : application.distance.toFixed(3)
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                <button onClick={() => dispatch(updateApplicationStatus({
                                                    applicationId: application.id,
                                                    status: 'accepted',
                                                    jobDetails
                                                }))}>
                                                    Accept
                                                </button>
                                                <button onClick={() => dispatch(updateApplicationStatus({
                                                    applicationId: application.id,
                                                    status: 'rejected',
                                                    jobDetails
                                                }))}>
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))) : (
                                    (
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                                No applicants yet
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllCandidates;
