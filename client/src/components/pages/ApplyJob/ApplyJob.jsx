import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { applyForJob, fetchApplicationStatus } from '../../../api/application/apply'
import { TabsList } from './TabsList.js'
import axios from 'axios'
import Description from './Description'
import Company from './Company'
import Review from './Review'
import Applicants from '../Applicants/Applicants.jsx'
import { fetchCompany, fetchJob, updateMatchPercentage } from '../../../api/functions.js'
import { calculateDistance } from '../../../api/location/distance.js'
import { useSelector } from 'react-redux'
import { calculateMatch } from '../../../api/resume/resume-matcher.js'
import { setError} from '../../../redux/successSlice.js'
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
    const { user } = useSelector((state) => state.user)
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
        const distance = calculateDistance(company?.lat, company?.lon, user?.lat, user?.lon);

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
            return;
        }
    
        try {
            setApplying(true);

            // 1. First create the application
            const application = await applyForJob({ userId, jobId, distance });
            console.log('Application created:', application);

            if (!application || !application.id) {
                throw new Error('Application creation failed - no application ID returned');
            }

            // 2. Get the extracted text from CVData
            const cvResponse = await axios.get(
                `http://localhost:8080/api/resume/extract/${userId}`
            );
            const cvText = cvResponse.data.text;

            // 3. Calculate match percentage
            const percentage = await calculateMatch(jobDetails, cvText);
            console.log('Calculated match percentage:', percentage);

            // 4. Update the application with match percentage
            await updateMatchPercentage(application.id, percentage);

            setHasApplied(true);
            setApplying(false);
            alert('Job application submitted successfully!');
        } catch (error) {
            console.error('Error in applyToJob:', error);
            setApplying(false);

            if (error.response?.status === 400 && error.response.data?.includes("already applied")) {
                setHasApplied(true);
                alert('You have already applied to this job');
            } else {
                alert(error.message || 'Failed to submit application');
            }
        }
    }

    useEffect(() => {
        fetchCompany(setCompany, jobDetails)
    }, [jobDetails])

    useEffect(() => {
        fetchJob({ param, setJobDetails, userId, setLoading, setHasApplied });
    }, [param.id]);

    useEffect(()=>{
        console.log(jobDetails)
    }, [param.id])


    useEffect(() => {
        fetchApplicationStatus({ userId, jobId, setApplicationStatus })
    })

    if (loading) return <div className="p-4">Loading job details...</div>;
    if (!jobDetails) return <div className="p-4">Job not found</div>;

    return (
        <>
            <div className='ml-12 mt-8'>
                <div className='flex mb-6 -mt-4 space-x-10 '>
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
                        <>
                            <Applicants jobDetails={jobDetails} isMounted={isMounted} />
                        </>
                    )
                }

                {role === 'user' && (applying ?
                    <button style={{ backgroundColor: 'black', cursor: 'default' }} disabled
                        className="mt-60 ml-160 text-white  rounded w-40 h-14 mt-20"> Applying... </button>
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
                                <button disabled style={{ backgroundColor: 'black', cursor: 'default', marginTop:"20px", marginBottom:"20px", display:"flex" ,justifyContent:"center", alignItems:"center"}}
                                    className="pt-60 mb-20 ml-160 text-white  rounded w-40 h-14"> Pending...
                                </button>
                            )

                        )

                        :
                        <button
                            onClick={() => applyToJob()}
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