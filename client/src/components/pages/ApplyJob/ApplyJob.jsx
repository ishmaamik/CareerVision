import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { applyForJob, fetchApplicationStatus } from '../../../api/application/apply'
import { TabsList } from './TabsList.js'
import Description from './Description'
import Company from './Company'
import Review from './Review'
import Applicants from './Applicants'
import { fetchCompany, fetchJob } from '../../../api/functions.js'
import { calculateDistance } from '../../../api/location/distance.js'
import { useSelector } from 'react-redux'

const ApplyJob = () => {

    const [tab, setTab] = useState('Description')
    const [jobDetails, setJobDetails] = useState(null)
    const [isMounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [company, setCompany] = useState(null)
    const [applicationStatus, setApplicationStatus] = useState(null)
    const jobId = jobDetails?.id

    const role = localStorage.getItem('role')
    const {user}= useSelector((state)=>state.user)
    const userId = localStorage.getItem('userId')
    const param = useParams()

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50)
        console.log(param.id)

        return () => {
            setMounted(false)
            clearTimeout(timer)
        }
    }, [param.id])

    const setTabName = (tabName) => {
        setMounted(false)
        setTab(tabName)
        setTimeout(() => setMounted(true), 50)
    }

    const applyToJob = async () => {

        const distance= calculateDistance(company?.lat, company?.lon, user?.lat, user?.lon)

        console.log('Sending application with:', {
            userId: userId,
            jobId: jobId,
            distance: distance
        });

        if (!userId || !jobId) {
            alert('Missing user ID or job ID');
            return;
        }

        if (hasApplied) {
            return; // Already applied
        }

        try {
            setApplying(true);
            const application = await applyForJob({ userId, jobId, distance })
            console.log(application)

            if (application) {
                setHasApplied(true)
                setApplying(false)
                alert('Job application submitted successfully!')

            }

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCompany(setCompany, jobDetails)
    }, [jobDetails])

    useEffect(() => {
        fetchJob({ param, setJobDetails, userId, setLoading, setHasApplied });
    }, [param.id]);

    useEffect(() => {
        fetchApplicationStatus({ userId, jobId, setApplicationStatus })
    })

    if (loading) return <div className="p-4">Loading job details...</div>;
    if (!jobDetails) return <div className="p-4">Job not found</div>;

    return (
        <>
            <div className='ml-92'>
                <div className='flex mb-12 -mt-4 space-x-10 items-center justify-center'>
                    {TabsList.map(tabList => (
                        <p className={`${tab === tabList.name ? `bg-black  text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded `} onClick={() => setTabName(`${tabList.name}`)}>{tabList.name}</p>
                    ))}

                    {role === "recruiter" && <p className={`${tab === 'Applicants' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Applicants')}>Applicants</p>}
                </div>

                {
                    tab === 'Description' && (
                        <Description jobDetails={jobDetails} isMounted={isMounted} />
                    )
                }

                {
                    tab === 'Company' && (
                        <Company jobDetails={jobDetails} company={company} isMounted={isMounted} />
                    )
                }

                {
                    tab === 'Review' && (
                        <Review isMounted={isMounted} />
                    )
                }

                {
                    tab === 'Applicants' && (
                        <Applicants jobDetails={jobDetails} isMounted={isMounted} />
                    )
                }

                {role === 'user' && (applying ?
                    <button style={{ backgroundColor: 'black', cursor: 'default' }} disabled
                        className="mt-6 ml-160 text-white  rounded w-40 h-14"> Applying... </button>
                    :
                    (hasApplied ?
                        (applicationStatus === 'accepted' ?
                            <button disabled style={{ backgroundColor: 'green', cursor: 'default' }}
                                className="mt-6 ml-160 text-white  rounded w-40 h-14"> Accepted
                            </button>
                            :
                            (applicationStatus === 'rejected' ?
                                <button disabled style={{ backgroundColor: 'red', cursor: 'default' }}
                                    className="mt-6 ml-160 text-white  rounded w-40 h-14"> Rejected
                                </button>
                                :
                                <button disabled style={{ backgroundColor: 'black', cursor: 'default' }}
                                    className="mt-6 ml-160 text-white  rounded w-40 h-14"> Pending...
                                </button>
                            )

                        )

                        :
                        <button
                            onClick={()=>applyToJob()}
                            style={{ backgroundColor: 'black' }}
                            className="mt-6 ml-160 text-white  rounded w-40 h-14"
                        >
                            Apply to Job
                        </button>))
                }

            </div>
        </>
    )
}

export default ApplyJob;