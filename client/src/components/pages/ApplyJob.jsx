import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById } from '../../api/job/job'
import { applyForJob, getApplicationsByUser } from '../../api/application/apply'
import { getCompanyFromName } from '../../api/company/company'

const ApplyJob = () => {

    const [tab, setTab] = useState('Description')
    const [jobDetails, setJobDetails] = useState(null)
    const [isMounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(true);
    const [hasApplied, setHasApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [company, setCompany] = useState(null)
    const role = localStorage.getItem('role')
    const jobId = jobDetails?.id
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



        console.log('Sending application with:', {
            userId: userId,
            jobId: jobId
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
            const application = await applyForJob({ userId, jobId })
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

    const fetchCompany = async () => {
        const companyx = await getCompanyFromName(jobDetails?.company)
        setCompany(companyx.company)
        console.log(companyx.company)
    }

    useEffect(() => {
        fetchCompany()
    }, [jobDetails])

    useEffect(() => {
        const fetchJob = async () => {
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

        fetchJob();
    }, [param.id]);

    if (loading) return <div className="p-4">Loading job details...</div>;
    if (!jobDetails) return <div className="p-4">Job not found</div>;

    return (
        <>
            <div className='ml-92'>
                <div className='flex mb-12 -mt-4 space-x-10 items-center justify-center'>
                    <p className={`${tab === 'Description' ? `bg-black  text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded `} onClick={() => setTabName('Description')}>Description</p>
                    <p className={`${tab === 'Company' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Company')}>Company</p>
                    <p className={`${tab === 'Review' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Review')}>Review</p>
                    {role === "recruiter" && <p className={`${tab === 'Applicants' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Applicants')}>Applicants</p>}
                </div>

                {
                    tab === 'Description' && (
                        <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out items-center justify-center`}>
                            <div className="  w-200 h-auto pb-6 pr-4 rounded-lg bg-white  shadow-lg text-left ">
                                <strong className='pl-4 pt-4 inline-block'> About this Role: </strong>
                                <p className='pl-4 pt-4'>{jobDetails.description}</p>
                                <strong className='pl-4 pt-4 inline-block '>Responsibilities:</strong>
                                <ul className='list-disc pl-8 pt-4'>
                                    {jobDetails.responsibilities
                                        .split('\n')
                                        .filter(line => line.trim() !== '')
                                        .map((responsibility, index) => (
                                            <li key={index} className="mb-2">
                                                {responsibility.replace(/^•\s*/, '')}
                                            </li>
                                        ))}
                                </ul>

                                <strong className='pl-4 pt-4 inline-block'>Qualifications</strong>
                                <ul className='list-disc pl-8 pt-4'>
                                    {jobDetails.qualifications
                                        .split('\n')
                                        .filter(line => line.trim() !== '')
                                        .map((qualification, index) => (
                                            <li key={index} className="mb-2">
                                                {qualification.replace(/^•\s*/, '')}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    )
                }

                {
                    tab === 'Company' && (
                        <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out items-center justify-center`}>
                            <div className="  w-200 h-auto pb-6 pr-4 rounded-lg bg-white  shadow-lg text-left ">
                                <strong className='pl-4 pt-4 inline-block'> {jobDetails?.company} </strong>
                                <p className='pl-4 pt-4 pb-4'>{company?.overview}</p>
                                {company?.commitment && company.commitment.trim().length > 0 ?
                                    <ul className='list-disc pl-8 pt-4'>
                                        {company.commitment
                                            .split('\n')
                                            .filter(line => line.trim() !== '')
                                            .map((commitment, index) => (
                                                <li key={index} className="mb-2">
                                                    {commitment.replace(/^•\s*/, '')}
                                                </li>
                                            ))}
                                    </ul>
                                    :
                                    <p className="pl-4 pt-4">No commitment info available</p>
                                }

                            </div>
                        </div>
                    )
                }

                {
                    tab === 'Review' && (
                        <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2  flex items-center justify-center`}>
                            <div className="w-200 h-100 rounded-lg bg-white  shadow-lg">

                                <p> Review </p>
                            </div>
                        </div>
                    )
                }

                {
                    tab === 'Applicants' && (
                        <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2  flex items-center justify-center`}>
                            <div className="w-200 h-100 rounded-lg bg-white  shadow-lg">

                                <p> Applicant </p>
                            </div>
                        </div>
                    )
                }

                {role === 'User' && (applying ?
                    <button style={{ backgroundColor: 'black', cursor: 'default' }} disabled
                        className="mt-6 ml-160 text-white  rounded w-40 h-14"> Applying... </button> : (hasApplied ? <button disabled style={{ backgroundColor: 'black', cursor: 'default' }}
                            className="mt-6 ml-160 text-white  rounded w-40 h-14"> Pending... </button> :
                            <button
                                onClick={applyToJob}
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