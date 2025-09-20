import React, { useState, useEffect, useContext } from 'react';
import { savedJobsService } from '../../api/savedJobsApi';
import { User } from '../../context/UserContext';
import { Bookmark, MapPin, Briefcase } from 'lucide-react';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user context
    const { userDetails: user } = useContext(User);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            if (!user) {
                setError('Please log in to view saved jobs');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const jobs = await savedJobsService.getSavedJobs(user.id);
                setSavedJobs(jobs);
                setError(null);
            } catch (err) {
                console.error('Error fetching saved jobs:', err);
                setError('Failed to load saved jobs');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedJobs();
    }, [user]);

    const handleUnsaveJob = async (jobId) => {
        if (!user) {
            setError('Please log in to unsave jobs');
            return;
        }

        try {
            await savedJobsService.unsaveJob(user.id, jobId);
            // Remove the unsaved job from the list
            setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        } catch (err) {
            console.error('Error unsaving job:', err);
            setError('Failed to unsave job');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading saved jobs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
                <Bookmark className="mr-3 text-blue-600" /> Saved Jobs
            </h1>

            {savedJobs.length === 0 ? (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <Bookmark className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-xl text-gray-600">No saved jobs yet</p>
                    <p className="text-gray-500 mt-2">Start exploring and save jobs you're interested in!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                        <div 
                            key={job.id} 
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                                    <p className="text-gray-600 text-sm">{job.company?.name || 'Company Name'}</p>
                                </div>
                                <button
                                    onClick={() => handleUnsaveJob(job.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    title="Unsave Job"
                                >
                                    <Bookmark className="w-6 h-6 fill-current" />
                                </button>
                            </div>

                            <div className="flex items-center text-gray-600 text-sm mb-3">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{job.location}</span>
                            </div>

                            <div className="flex items-center text-gray-600 text-sm mb-4">
                                <Briefcase className="w-4 h-4 mr-2" />
                                <span>{job.jobType}</span>
                            </div>

                            <div className="mt-4">
                                <a 
                                    href={`/jobs/${job.id}`} 
                                    className="w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Job Details
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
