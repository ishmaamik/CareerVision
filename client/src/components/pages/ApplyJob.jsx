import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById } from '../../api/job/job'

const ApplyJob = () => {

    const [tab, setTab] = useState('Description')
    const [jobDetails, setJobDetails] = useState(null)
    const [isMounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                console.log("Fetching job with ID:", param.id);
                const response = await getJobById(param.id);
                console.log("API Response:", response);

                if (response) {
                    setJobDetails(response);
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

            <div className='flex mb-12 -mt-4 space-x-10 items-center justify-center'>
                <p className={`${tab === 'Description' ? `bg-black  text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded `} onClick={() => setTabName('Description')}>Description</p>
                <p className={`${tab === 'Company' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Company')}>Company</p>
                <p className={`${tab === 'Review' ? `bg-black text-white` : `bg-white mt-30 text-black`} cursor-pointer mt-30 px-4 py-2 rounded`} onClick={() => setTabName('Review')}>Review</p>
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
                            <strong className='pl-4 pt-4 inline-block'> Flyte Solutions Ltd. </strong>
                            <p className='pl-4 pt-4'>Flyte Solutions is a client-focused custom software development company that delivers strategic, ROI-driven solutions tailored to your business needs. Leveraging the latest technology stack, we specialize in building scalable, innovative, and cost-effective software products for startups, SMBs, and large enterprises. </p>
                            <ul className='list-decimal pl-8 pt-4'>
                                <li>  Custom Software Development
                                    - Build bespoke software solutions using modern frameworks like Node.js, Python (Django/Flask), and .NET Core.
                                    - Cloud-native development with AWS, Azure, and Google Cloud Platform (GCP).
                                    - Microservices architecture for scalable and maintainable systems.   </li>


                                <li>  Web Application Development
                                    - Responsive, user-centric web apps built with React.js, Angular, or Vue.js.
                                    - Backend development using **Spring Boot, Laravel, or Express.js.
                                    - Integration with modern APIs and third-party services.  </li>
                                <li>  Mobile Application Development
                                    - Cross-platform apps with Flutter and React Native.
                                    - Native iOS and Android development using **Swift, Kotlin, and Java.
                                    - Seamless integration with AI/ML, IoT, and AR/VR technologies.  </li>
                            </ul>
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

            <button
                onClick={() => (window.location.href = "/jobs/create")}
                style={{ backgroundColor: 'black' }}
                className="mt-6 ml-160 text-white  rounded w-40 h-14"
            >
                Apply to Job
            </button>

        </>
    )
}

export default ApplyJob;