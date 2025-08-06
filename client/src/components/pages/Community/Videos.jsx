import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import {FaVideo} from 'react-icons/fa'

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('programming');
    const [loading, setLoading] = useState(true);
    const [isMounted, setMounted] = useState(false);

    const apiKey = 'AIzaSyAVtxsRpmkD6nw9zk2RSPC_Ruj-l2VJwgA'; // Replace with your actual YouTube API key

    const fetchVideos = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=9&key=${apiKey}`
            );
            setVideos(response.data.items || []);
        } catch (error) {
            console.error("Failed to fetch videos:", error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(searchQuery);
        const timer = setTimeout(() => setMounted(true), 50);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchVideos(searchQuery.trim());
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-20 ml-20">
                <TextField
                    label="Search Videos"
                    size="small"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: 300 }}
                />
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </div>

            {loading ? (
                <div className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out items-center mt-24 ml-10`}>
                    <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                        <p>Loading Videos...</p>
                    </div>
                </div>
            ) : (
                <div className='flex ml-20'>
                    <div className="flex flex-wrap gap-4 items-start mt-12">
                        {videos.length > 0 ? videos.map((video, index) => (
                            <div key={index} className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} cursor-pointer hover:-translate-y-2 transition-all duration-800 ease-in-out flex ml-3`}>
                                <div className="break-words h-auto w-72 rounded-lg bg-white p-4 shadow-lg flex flex-col">
                                    <div className="relative h-40 overflow-hidden group mb-3">
                                        <img
                                            src={video.snippet.thumbnails.medium.url}
                                            alt={video.snippet.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-white/90 p-2 rounded-full">
                                                <FaVideo className="w-5 h-5 text-red-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <b className='text-sm'>{video.snippet.title}</b>
                                    <p style={{ fontSize: '12px' }} className="mt-2 line-clamp-2">
                                        {video.snippet.description}
                                    </p>
                                    <i className='text-xs block mt-2 pr-1'>
                                        Published: {formatDate(video.snippet.publishedAt)}
                                    </i>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ marginTop: '8px', fontSize: '11px' }}
                                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')}
                                        startIcon={<FaVideo size={14} />}
                                    >
                                        Watch Video
                                    </Button>
                                </div>
                            </div>
                        )) : (
                            <div className={`fixed transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out left-1/2 -translate-x-1/2 flex items-center justify-center min-h-screen`}>
                                <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                                    <p>No Videos Found</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Videos;