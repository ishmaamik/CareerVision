import React, { useState, useEffect } from 'react'

const ApplyJobStruct = () => {

    const [tab, setTab] = useState('Description')
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50)
        return () => {
            setMounted(false)
            clearTimeout(timer)
        }
    }, [])

    const setTabName = (tabName) => {
        setMounted(false)
        setTab(tabName)
        setTimeout(() => setMounted(true), 50)
    }

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
                            <p className='pl-4 pt-4'>We are looking for a talented and motivated Node.js Developer (Mid or Senior level) to join our onsite team in Dhaka. You will be responsible for designing, developing, and maintaining backend services and APIs for web and enterprise applications. As a key member of our development team, you will collaborate with frontend engineers, QA, and DevOps to deliver high-performance, scalable solutions.</p>
                            <ul className='list-disc pl-8 pt-4'>
                                <li> Design, develop, and maintain server-side logic, APIs, and microservices using Node.js. </li>
                                <li>  Collaborate with frontend developers to integrate user-facing elements with server-side logic. </li>
                                <li>  Build scalable and secure RESTful (and/or GraphQL) APIs. </li>
                            </ul>

                            <p className='pl-4 pt-4'>Qualifications</p>
                            <ul className='list-disc pl-8 pt-4'>
                                <li> Bachelor’s degree in Computer Science, Engineering, or a related field (or equivalent experience). </li>
                                <li> Mid-Level: 2+ years professional experience with Node.js. </li>
                                <li> Senior Level: 5+ years professional experience with Node.js, with proven backend architecture and leadership experience.  </li>
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
                + Apply to Job
            </button>

        </>
    )
}

export default ApplyJobStruct;