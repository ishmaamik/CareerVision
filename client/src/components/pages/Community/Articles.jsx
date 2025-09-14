import React, { useEffect, useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Chip, Box, IconButton, Skeleton } from '@mui/material';
import { Search, Bookmark, BookmarkBorder, Share, TrendingUp, AccessTime, Person } from '@mui/icons-material';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('technology career');
    const [loading, setLoading] = useState(true);
    const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
    const [isMounted, setMounted] = useState(false);

    const apiKey = '42c74bd9319040deb948b388f9c3c531';

    const fetchArticles = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&sortBy=popularity&pageSize=20`);
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
        const timer = setTimeout(() => setMounted(true), 100);
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

    const handleBookmark = (index) => {
        setBookmarkedArticles(prev => {
            const newBookmarks = new Set(prev);
            if (newBookmarks.has(index)) {
                newBookmarks.delete(index);
            } else {
                newBookmarks.add(index);
            }
            return newBookmarks;
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const truncateText = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    const categories = ['Technology', 'Business', 'Startup', 'Leadership', 'Innovation', 'Career Growth'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">Career Insights & Articles</h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Stay updated with the latest trends, insights, and knowledge to advance your career
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto flex gap-4">
                            <TextField
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                variant="outlined"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "white",
                                        borderRadius: "12px",
                                        "& fieldset": {
                                            borderColor: "#E2E8F0",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3B82F6",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#3B82F6",
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: <Search className="text-slate-500 mr-2" />,
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
                                startIcon={<Search />}
                            >
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                onClick={() => {
                                    setSearchQuery(category.toLowerCase());
                                    fetchArticles(category.toLowerCase());
                                }}
                                className="bg-white/10 text-white border-white/20 hover:bg-white/20 cursor-pointer"
                                variant="outlined"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                            <Card key={skeleton} className="shadow-lg rounded-2xl overflow-hidden">
                                <Skeleton variant="rectangular" height={200} />
                                <CardContent className="p-6">
                                    <Skeleton variant="text" width="60%" height={30} />
                                    <Skeleton variant="text" width="40%" height={20} className="mt-2" />
                                    <Skeleton variant="text" height={20} className="mt-4" />
                                    <Skeleton variant="text" height={20} />
                                    <Skeleton variant="text" width="80%" height={20} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <>
                        {articles.length > 0 ? (
                            <>
                                {/* Featured Article */}
                                {articles[0] && (
                                    <div className="mb-12">
                                        <div className="flex items-center space-x-2 mb-6">
                                            <TrendingUp className="text-blue-600" />
                                            <Typography variant="h4" className="font-bold text-slate-800">
                                                Featured Article
                                            </Typography>
                                        </div>
                                        <Card className="shadow-xl rounded-3xl overflow-hidden border-0 group hover:shadow-2xl transition-all duration-300">
                                            <div className="md:flex">
                                                <div className="md:w-1/2">
                                                    <img
                                                        src={articles[0].urlToImage || '/default-article.jpg'}
                                                        alt={articles[0].title}
                                                        className="w-full h-80 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="md:w-1/2 p-8">
                                                    <div className="flex items-center space-x-4 mb-4">
                                                        <Chip 
                                                            label="Featured" 
                                                            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold"
                                                        />
                                                        <div className="flex items-center text-slate-500 text-sm">
                                                            <AccessTime className="w-4 h-4 mr-1" />
                                                            {formatDate(articles[0].publishedAt)}
                                                        </div>
                                                    </div>
                                                    <Typography variant="h4" className="font-bold text-slate-800 mb-4 leading-tight">
                                                        {articles[0].title}
                                                    </Typography>
                                                    <Typography className="text-slate-600 text-lg leading-relaxed mb-6">
                                                        {truncateText(articles[0].description, 30)}
                                                    </Typography>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2 text-slate-500">
                                                            <Person className="w-4 h-4" />
                                                            <span className="text-sm">{articles[0].author || 'Unknown Author'}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <IconButton
                                                                onClick={() => handleBookmark(0)}
                                                                className="text-slate-500 hover:text-blue-600"
                                                            >
                                                                {bookmarkedArticles.has(0) ? <Bookmark /> : <BookmarkBorder />}
                                                            </IconButton>
                                                            <IconButton className="text-slate-500 hover:text-green-600">
                                                                <Share />
                                                            </IconButton>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => window.open(articles[0].url, '_blank')}
                                                                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-xl font-semibold"
                                                            >
                                                                Read Article
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}

                                {/* Articles Grid */}
                                <div className="mb-8">
                                    <Typography variant="h4" className="font-bold text-slate-800 mb-8">
                                        Latest Articles
                                    </Typography>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {articles.slice(1).map((article, index) => (
                                            <Card
                                                key={index + 1}
                                                className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border-0 group cursor-pointer"
                                                onClick={() => window.open(article.url, '_blank')}
                                            >
                                                <div className="relative">
                                                    <img
                                                        src={article.urlToImage || '/default-article.jpg'}
                                                        alt={article.title}
                                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-4 right-4">
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleBookmark(index + 1);
                                                            }}
                                                            className="bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600"
                                                            size="small"
                                                        >
                                                            {bookmarkedArticles.has(index + 1) ? <Bookmark /> : <BookmarkBorder />}
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <CardContent className="p-6">
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <div className="flex items-center text-slate-500 text-sm">
                                                            <AccessTime className="w-4 h-4 mr-1" />
                                                            {formatDate(article.publishedAt)}
                                                        </div>
                                                    </div>
                                                    <Typography variant="h6" className="font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                                        {truncateText(article.title, 15)}
                                                    </Typography>
                                                    <Typography className="text-slate-600 mb-4 leading-relaxed">
                                                        {truncateText(article.description, 20)}
                                                    </Typography>
                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                        <div className="flex items-center space-x-2 text-slate-500 text-sm">
                                                            <Person className="w-4 h-4" />
                                                            <span>{truncateText(article.author || 'Unknown', 2)}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <IconButton
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="text-slate-500 hover:text-green-600"
                                                                size="small"
                                                            >
                                                                <Share />
                                                            </IconButton>
                                                            <Button
                                                                size="small"
                                                                className="text-blue-600 hover:bg-blue-50 font-semibold"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(article.url, '_blank');
                                                                }}
                                                            >
                                                                Read More
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Card className="shadow-lg rounded-2xl overflow-hidden">
                                <CardContent className="text-center py-16">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-12 h-12 text-blue-600" />
                                    </div>
                                    <Typography variant="h5" className="text-slate-700 font-semibold mb-4">
                                        No Articles Found
                                    </Typography>
                                    <Typography className="text-slate-500 mb-6 max-w-md mx-auto">
                                        Try searching with different keywords or browse our suggested categories above.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setSearchQuery('career development');
                                            fetchArticles('career development');
                                        }}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
                                    >
                                        Try Career Development
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Articles;
