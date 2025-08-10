import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../../../redux/applicationsSlice';
import { ApplicantsTabs } from './ApplicantsTabs';
import AllCandidates from './AllCandidates';
import TopCandidates from './TopCandidates';

const Applicants = ({ jobDetails, isMounted }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.applications);
    const [tab, setTab] = useState('All Candidates');

    useEffect(() => {
        if (jobDetails?.id) {
            dispatch(getApplications(jobDetails));
        }
    }, [jobDetails, dispatch]);

    if (loading) return <div className="text-center py-4">Loading applicants...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    return (
        <>
            <div className="flex mt-20 pb-12 space-x-10">
                {ApplicantsTabs.map(tabList => (
                    <p
                        key={tabList.name}
                        className={`${tab === tabList.name ? 'bg-black text-white' : 'bg-white text-black'} cursor-pointer px-4 py-2 rounded`}
                        onClick={() => setTab(tabList.name)}
                    >
                        {tabList.name}
                    </p>
                ))}
            </div>

            <div className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out`}>
                {tab === 'All Candidates' && <AllCandidates />}
                {tab === 'Top 5' && <TopCandidates jobId={jobDetails.id} topN={5} />}
                {tab === 'Top 10' && <TopCandidates jobId={jobDetails.id} topN={10} />}
                {tab === 'Top 15' && <TopCandidates jobId={jobDetails.id} topN={15} />}
            </div>
        </>
    );
};

export default Applicants;
