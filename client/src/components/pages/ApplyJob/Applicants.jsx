import React from 'react'
import { applications } from './ApplicantsList'

const Applicants = ({ jobDetails, isMounted }) => {
    return (
        <>
            <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2  flex items-center justify-center`}>
                <div className="w-200 h-100 rounded-lg bg-white  shadow-lg">

                    <h2 className="text-2xl font-bold mb-6">Applicants for {jobDetails?.title}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-center">
                                    <th className="py-3 px-4 ">Name</th>
                                    <th className="py-3 px-4 ">Email</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Percentage Match with Job and CV</th>
                                    <th className="py-3 px-4 ">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length > 0 ? (
                                    applications.map((application) => (
                                        <tr key={application.id} className="border-b text-center">
                                            <td className="py-3 px-4">{application.applicant.name}</td>
                                            <td className="py-3 px-4">{application.applicant.email}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                        'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {application.status}
                                                </span>
                                            </td>
                                            <td className='text-center'>80</td>
                                            <td className="py-3 px-4 w-60">
                                                <button
                                                    style={{ backgroundColor: 'green' }}
                                                    onClick={() => updateApplicationStatus(application.id, 'accepted')}
                                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    style={{ backgroundColor: 'red' }}
                                                    onClick={() => updateApplicationStatus(application.id, 'rejected')}
                                                    className="bg-red-500 text-white py-1 rounded hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-500">
                                            No applicants yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Applicants;