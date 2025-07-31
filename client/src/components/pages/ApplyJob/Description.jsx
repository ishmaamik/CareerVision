import React from 'react'

const Description = ({ jobDetails, isMounted }) => {
    return (
        <>
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
        </>
    )
}

export default Description;