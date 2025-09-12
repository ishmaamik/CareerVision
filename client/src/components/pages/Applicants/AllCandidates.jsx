// AllCandidates.jsx - Debug version to identify the issue
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateApplicationStatus } from '../../../redux/applicationsSlice';
import { FaFilePdf } from 'react-icons/fa';
import { PercentageBadge } from './PercentageBadge';

const AllCandidates = ({ jobDetails }) => {
    const [isMounted, setMounted] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [locationThreshold, setLocationThreshold] = useState('');
    const [percentageThreshold, setPercentageThreshold] = useState(80);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState('');

    const dispatch = useDispatch();

    // DEBUG: Let's inspect the entire Redux state
    const entireState = useSelector(state => state);
    const applicationsState = useSelector(state => state.applications);
    const { matchPercentages, matchErrors } = useSelector(state => state.percentages || {});


    // Try different ways to access the applications
    const applications = applicationsState?.list || [];
    const { loading, error } = applicationsState || {};

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);



    // Filter applications in memory based on current filters
    const filteredList = React.useMemo(() => {


        let filtered = [...applications];

        // Apply filters
        const locThresholdNum = Number(locationThreshold);
        if (filterType === 'location' && !isNaN(locThresholdNum)) {
            filtered = filtered.filter(app =>
                app.distance !== null && app.distance !== undefined && app.distance <= locThresholdNum
            );
        }
        else if (filterType === 'percentage') {
            filtered = filtered.filter(app => {
                const percentage = app.matchPercentage ?? matchPercentages?.[app.id] ?? 0;
                return percentage >= percentageThreshold;
            });
        }

        // Apply search filter
        if (search && search.trim()) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(app => {
                const applicant = app.applicant;
                if (!applicant) return false;

                const name = (applicant.name || '').toLowerCase();
                const location = (applicant.location || '').toLowerCase();
                return name.includes(searchLower) || location.includes(searchLower);
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (filterType === 'location') {
                const aDistance = a.distance ?? Infinity;
                const bDistance = b.distance ?? Infinity;
                return aDistance - bDistance;
            } else {
                const aPercentage = a.matchPercentage ?? matchPercentages?.[a.id] ?? 0;
                const bPercentage = b.matchPercentage ?? matchPercentages?.[b.id] ?? 0;
                return bPercentage - aPercentage; // Descending order
            }
        });

        const limitNum = Number(limit);
        if (limit && !isNaN(limitNum) && limitNum > 0) {
            filtered = filtered.slice(0, limitNum);
        }


        console.log('🟢 AllCandidates: Filtered down to', filtered.length, 'applications');
        return filtered;
    }, [applications, filterType, locationThreshold, percentageThreshold, search, limit, matchPercentages]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <>

            {/* Filter Controls */}
            <div className="flex gap-4 mb-4">
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded"
                >
                    <option value="all">All Candidates</option>
                    <option value="location">By Location</option>
                    <option value="percentage">By Match %</option>
                </select>

                {filterType === 'location' && (
                    <input
                        placeholder="Max Distance (km)"  // This shows when input is empty
                        value={locationThreshold}
                        onChange={e => setLocationThreshold(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                )}

                {filterType === 'percentage' && (
                    <input
                        type="number"
                        placeholder="Min Match %"
                        value={percentageThreshold}
                        onChange={e => setPercentageThreshold(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                )}

                <input
                    type="text"
                    placeholder="Search by name/location"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded"
                />

                <input
                    
                    placeholder="Top N"
                    value={limit}
                    onChange={e => setLimit(e.target.value)}  // store raw string
                    className="px-3 py-2 border border-gray-300 rounded"
                />
            </div>

            <div
                className={`
                    transform
                    ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'}
                    transition-all duration-800 ease-in-out pb-12
                `}
            >
                <div className="w-400 max-w-1200 px-0 mb-12 rounded-lg bg-white shadow-lg">
                    <table className="max-w-1000 bg-white">
                        <thead>
                            <tr className="bg-white text-center">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Applicant's Photo</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Applicant Resume</th>
                                <th className="py-3 px-4">Percentage Match</th>
                                <th className="py-3 px-4">Distance (in km)</th>
                                <th className="py-3 px-4 ">Location</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList && filteredList.length > 0 ? (
                                filteredList.map(application => (
                                    <tr key={application.id}>
                                        <td className="py-3 px-4">{application.applicant?.name || 'N/A'}</td>
                                        <td className="py-3 px-4">{application.applicant?.email || 'N/A'}</td>
                                        <td className="py-3 px-4 justify-center items-center">
                                            <img
                                                style={{ borderRadius: '50%', width:'100px' }}
                                                src={application.applicant?.profilePictureUrl || '/default-profile.jpg'}
                                                alt="Profile"
                                            />
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${application.status === 'accepted'
                                                    ? 'text-green-900'
                                                    : application.status === 'rejected'
                                                        ? 'text-red-800'
                                                        : 'text-blue-800'
                                                    }`}
                                            >
                                                {application.status === 'accepted'
                                                    ? 'Accepted'
                                                    : application.status === 'rejected'
                                                        ? 'Rejected'
                                                        : 'Pending'}
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
                                                percentage={application.matchPercentage ?? matchPercentages?.[application.id] ?? 0}
                                                error={matchErrors?.[application.id]}
                                            />
                                        </td>
                                        <td className="py-3 px-4 justify-center items-center">
                                            {typeof application?.distance === 'number'
                                                ? application.distance === 0
                                                    ? 0
                                                    : application.distance.toFixed(3)
                                                : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 justify-center items-center w-50">
                                            {application?.applicant?.location}
                                        </td>
                                        <td>
                                            <button
                                                className="bg-green-500 text-white px-1 py-1 rounded mr-2 hover:bg-green-600"
                                                onClick={() =>
                                                    dispatch(
                                                        updateApplicationStatus({
                                                            applicationId: application.id,
                                                            status: 'accepted',
                                                            jobDetails
                                                        })
                                                    )
                                                }
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                onClick={() =>
                                                    dispatch(
                                                        updateApplicationStatus({
                                                            applicationId: application.id,
                                                            status: 'rejected',
                                                            jobDetails
                                                        })
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="py-4 text-center text-gray-500">
                                        No applicants found ({filteredList?.length || 0} total)
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllCandidates;