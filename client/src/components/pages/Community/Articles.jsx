import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('javascript');
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState([]);
    const [isMounted, setMounted] = useState(false);

    const apiKey = '42c74bd9319040deb948b388f9c3c531';

    const fetchArticles = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
            setArticles(response.data.articles || []);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(searchQuery);
        const timer = setTimeout(() => setMounted(true), 50);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            fetchArticles(searchQuery.trim());
        }
    };

    const handleToggleContent = (index) => {
        setExpandedIndex(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const getWordCount = (text) => {
        return text ? text.trim().split(/\s+/).length : 0;
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-20 ml-20">
                <TextField
                    label="Search News"
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
                        <p>Loading Articles...</p>
                    </div>
                </div>
            ) : (
                <div className='flex ml-20'>
                    <div className="flex flex-wrap gap-4 items-start mt-12">
                        {articles.length > 0 ? articles.map((article, index) => {
                            const isExpanded = expandedIndex.includes(index);
                            const wordCount = getWordCount(article.description);
                            const shouldTruncate = wordCount > 20;
                            const displayedDescription = isExpanded || !shouldTruncate
                                ? article.description
                                : article.description?.split(' ').slice(0, 20).join(' ') + '...';

                            return (
                                <div key={index} className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} cursor-pointer hover:-translate-y-2 transition-all duration-800 ease-in-out flex ml-3`}>
                                    <div className="break-words h-auto w-72 rounded-lg bg-white p-4 shadow-lg flex flex-col">
                                        <b className='text-sm'>{article.title}</b>
                                        <div className="mt-2">
                                            <p style={{ fontSize: '12px' }}>
                                                {displayedDescription}
                                            </p>
                                            {shouldTruncate && (
                                                <Button
                                                    disableRipple
                                                    variant="text"
                                                    sx={{
                                                        fontSize: '11px',
                                                        color: 'gray',
                                                        padding: 0,
                                                        minWidth: 'fit-content',
                                                        ":hover": { backgroundColor: 'transparent' },
                                                    }}
                                                    onClick={() => handleToggleContent(index)}
                                                >
                                                    {isExpanded ? 'See Less' : 'See More'}
                                                </Button>
                                            )}
                                        </div>
                                        <img src={article.urlToImage}/>
                                        <i className='text-xs block mt-2 pr-1'>~ {article.author || 'Unknown'}</i>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            sx={{ marginTop: '8px', fontSize: '11px' }}
                                            onClick={() => window.open(article.url, '_blank')}
                                        >
                                            Read Post
                                        </Button>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className={`fixed transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out left-1/2 -translate-x-1/2 flex items-center justify-center min-h-screen`}>
                                <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                                    <p>No News Articles Found</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default News;
