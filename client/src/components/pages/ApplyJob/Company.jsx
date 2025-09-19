import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, MessageCircle, ThumbsUp, Send } from 'lucide-react';

// Enhanced Company Component
const Company = ({ jobDetails, company, isMounted }) => {
    return (
        <div className={`transform transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-800">
                                {jobDetails?.company?.name?.charAt(0) || 'C'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{jobDetails?.company?.name}</h1>
                            <div className="flex items-center space-x-2 mt-2">
                                <MapPin className="w-4 h-4" />
                                <span className="opacity-90">Tech Company</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            Company Overview
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {company?.overview || "We are a forward-thinking company dedicated to innovation and excellence in our field."}
                        </p>
                    </div>

                    {company?.commitment && company.commitment.trim().length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Our Commitments
                            </h2>
                            <div className="grid gap-3">
                                {company.commitment
                                    .split('\n')
                                    .filter(line => line.trim() !== '')
                                    .map((commitment, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                                            <span className="text-gray-700 leading-relaxed">
                                                {commitment.replace(/^•\s*/, '')}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">No additional commitment information available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Company