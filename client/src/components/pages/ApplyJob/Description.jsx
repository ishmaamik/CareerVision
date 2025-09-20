import React from 'react'
import { Star, MapPin, Calendar, Users, MessageCircle, ThumbsUp, Send } from 'lucide-react';

// Enhanced Description Component
const Description = ({ jobDetails, isMounted }) => {
    return (
        <div className={`transform transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                    <h1 className="text-2xl font-bold">Job Description</h1>
                    <p className="opacity-90 mt-1">Everything you need to know about this role</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* About Role */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-bold text-sm">📋</span>
                            </div>
                            About this Role
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {jobDetails?.description || "Role description not available"}
                            </p>
                        </div>
                    </section>

                    {/* Responsibilities */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-green-600 font-bold text-sm">⚡</span>
                            </div>
                            Key Responsibilities
                        </h2>
                        <div className="grid gap-3">
                            {jobDetails?.responsibilities?.split('\n')
                                .filter(line => line.trim() !== '')
                                .map((responsibility, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-green-300">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-white text-xs font-bold">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-700 leading-relaxed">
                                            {responsibility.replace(/^•\s*/, '')}
                                        </span>
                                    </div>
                                )) || [<p key="no-resp" className="text-gray-500 italic">No responsibilities listed</p>]}
                        </div>
                    </section>

                    {/* Qualifications */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-purple-600 font-bold text-sm">🎓</span>
                            </div>
                            Required Qualifications
                        </h2>
                        <div className="grid gap-3">
                            {jobDetails?.qualifications?.split('\n')
                                .filter(line => line.trim() !== '')
                                .map((qualification, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-purple-300">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                                        <span className="text-gray-700 leading-relaxed">
                                            {qualification.replace(/^•\s*/, '')}
                                        </span>
                                    </div>
                                )) || [<p key="no-qual" className="text-gray-500 italic">No qualifications listed</p>]}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Description;