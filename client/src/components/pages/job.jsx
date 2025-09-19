import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobPostingsAPI from '../../api/job';
import JobPostingComments from '../comments/JobPostingComments';

const JobDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [jobPosting, setJobPosting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Fetch job posting details
    const fetchJobDetails = async () => {
        try {
            const jobData = await JobPostingsAPI.getJobById(jobId);
            setJobPosting(jobData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching job details:', err);
            setError(err);
            setLoading(false);
        }
    };

    // Handle job application
    const handleApplyJob = async () => {
        try {
            await JobPostingsAPI.applyForJob(jobId);
            // Show success notification or redirect
        } catch (err) {
            console.error('Error applying for job:', err);
        }
    };

    // Handle job editing
    const handleEditJob = () => {
        navigate(`/jobs/edit/${jobId}`);
    };

    // Handle job deletion
    const handleDeleteJob = async () => {
        try {
            await JobPostingsAPI.deleteJob(jobId);
            navigate('/jobs');
        } catch (err) {
            console.error('Error deleting job:', err);
        }
    };

    // Handle bookmark toggle
    const handleBookmarkToggle = () => {
        setIsBookmarked(!isBookmarked);
    };

    useEffect(() => {
        fetchJobDetails();
    }, [jobId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading job details...</h3>
                    <p className="text-gray-500">Please wait while we fetch the information</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Job</h2>
                    <p className="text-gray-600 mb-6">We couldn't load the job details. Please try again later.</p>
                    <button 
                        onClick={() => navigate('/jobs')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    if (!jobPosting) return null;

    const isJobOwner = user?.id === jobPosting.userId;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white overflow-hidden">
                            <div className="absolute inset-0 bg-black opacity-10"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full translate-y-48 -translate-x-48"></div>
                            
                            <div className="relative z-10">
                                {/* Header with Actions */}
                                <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                                    <div className="flex-1 mb-4 lg:mb-0">
                                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                            {jobPosting.title}
                                        </h1>
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold">{jobPosting.companyName}</h3>
                                                    <div className="flex items-center space-x-1 text-white text-opacity-90">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        <span>{jobPosting.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={handleBookmarkToggle}
                                            className={`p-3 rounded-2xl transition-all duration-200 ${
                                                isBookmarked 
                                                    ? 'bg-yellow-400 text-yellow-900' 
                                                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                                            }`}
                                        >
                                            <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                            </svg>
                                        </button>
                                        <button className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl transition-all duration-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                            </svg>
                                        </button>
                                        {isJobOwner && (
                                            <>
                                                <button 
                                                    onClick={handleEditJob}
                                                    className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl transition-all duration-200"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={handleDeleteJob}
                                                    className="p-3 bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded-2xl transition-all duration-200"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Job Meta Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white text-opacity-80 text-sm">Salary Range</p>
                                            <p className="text-xl font-bold">
                                                ${jobPosting.salaryRangeMin?.toLocaleString()} - ${jobPosting.salaryRangeMax?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white text-opacity-80 text-sm">Job Type</p>
                                            <div className="flex space-x-2">
                                                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                                                    {jobPosting.jobType}
                                                </span>
                                                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                                                    {jobPosting.experienceLevel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button 
                                    onClick={handleApplyJob}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        {/* Job Details Content */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-8">
                                {/* Required Skills */}
                                {jobPosting.requiredSkills && jobPosting.requiredSkills.length > 0 && (
                                    <div className="mb-8">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900">Required Skills</h2>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {jobPosting.requiredSkills.map((skill, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-700 font-medium hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-200 hover:scale-105"
                                                    style={{animationDelay: `${index * 100}ms`}}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-gray-200 pt-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span>Job Description</span>
                                    </h2>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {jobPosting.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <span>Comments & Discussion</span>
                                </h2>
                                <JobPostingComments jobPostingId={jobId} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Stats Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span>Job Statistics</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-gray-600">Views</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">
                                        {jobPosting.views || '1.2k'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-gray-600">Applications</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">
                                        {jobPosting.applicationCount || '45'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Company Info Card */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <span>About Company</span>
                            </h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                    {jobPosting.companyName?.[0]}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{jobPosting.companyName}</h4>
                                    <p className="text-gray-500">Technology Company</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Leading innovator in the tech industry, focusing on cutting-edge solutions 
                                and exceptional user experiences.
                            </p>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl border-2 border-green-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200 border border-gray-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                    <span>Share Job</span>
                                </button>
                                <button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-xl transition-all duration-200 border border-gray-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Save as PDF</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;