import React from 'react'

const Company = ({ jobDetails, company, isMounted }) => {
    return (
        <>
            <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out items-center justify-center`}>
                            <div className="  w-200 h-auto pb-6 pr-4 rounded-lg bg-white  shadow-lg text-left ">
                                <strong className='pl-4 pt-4 inline-block'> {jobDetails?.company?.name} </strong>
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
        </>
    )
}

export default Company;