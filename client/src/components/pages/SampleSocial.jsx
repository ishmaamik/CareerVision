import React, { useEffect, useState } from 'react'

const SampleSocial = () => {
    const [activeTab, setActiveTab] = useState('social') // 'social', 'articles', 'videos'
    const [blogs, setBlogs] = useState([
        {
            title: "Getting Started with React Hooks",
            content: "React Hooks are a powerful feature that allows you to use state and other React features without writing a class. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. Hooks let you organize the logic inside a component into reusable isolated units.",
            author: "John Doe"
        },
        {
            title: "Modern CSS Techniques",
            content: "CSS has evolved significantly over the years. Modern techniques like Flexbox, Grid, and CSS-in-JS libraries have revolutionized how we style our applications.",
            author: "Jane Smith"
        }
    ])
    const [videos, setVideos] = useState([
        {
            title: "JavaScript Tutorial for Beginners",
            content: "Complete JavaScript course covering fundamentals, ES6+, DOM manipulation, and async programming.",
            author: "Tech Guru",
            duration: "2:45:30"
        },
        {
            title: "React Component Patterns",
            content: "Learn advanced React patterns including render props, higher-order components, and compound components.",
            author: "React Master",
            duration: "1:30:45"
        }
    ])
    const [socialPosts, setSocialPosts] = useState([
        {
            author: "Salman Abdullah Fahim",
            title: "Software Engineer | Next.js | JavaScript | Express.js | PostgreSQL | MongoDB",
            timeAgo: "1w",
            verified: true,
            content: "আপনি যখন client থেকে request পাঠান, সেটা router পর্যন্ত কীভাবে পৌঁছায়?\n\nতারুণ তো, আপনি অনলাইনে একটা অর্ডার দিলেন।",
            reactions: 62,
            comments: 5,
            reposts: 1,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            author: "Sarah Johnson",
            title: "Frontend Developer | React | TypeScript | UI/UX",
            timeAgo: "2d",
            verified: false,
            content: "Just launched my new portfolio website! Built with Next.js 14, featuring dark mode, animations, and responsive design. Would love to get your feedback on the user experience. 🚀\n\n#WebDevelopment #React #Portfolio",
            reactions: 45,
            comments: 12,
            reposts: 3,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=150&h=150&fit=crop&crop=face"
        },
        {
            author: "Alex Chen",
            title: "Full Stack Engineer | Node.js | Python | AWS",
            timeAgo: "3d",
            verified: true,
            content: "Excited to share that I've successfully migrated our microservices architecture to Kubernetes! The deployment time reduced by 60% and we've achieved better scalability. \n\nKey lessons learned:\n✅ Proper resource allocation\n✅ Health checks are crucial\n✅ Monitoring from day one",
            reactions: 78,
            comments: 23,
            reposts: 8,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    ])
    const [loading, setLoading] = useState(true);
    const [isMounted, setMounted] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState([]);
    const [postText, setPostText] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        
        setTimeout(() => setMounted(true), 50)
        return () => setMounted(false)
    }, [])

    const handleToggleContent = (index) => {
        setExpandedIndex(prevState => 
            prevState.includes(index) 
                ? prevState.filter(expand => expand !== index) 
                : [...prevState, index]
        );
    };

    const handleCreateContent = () => {
        const contentType = activeTab === 'social' ? 'post' : activeTab.slice(0, -1)
        alert(`Create new ${contentType}`)
    }

    const handlePostSubmit = () => {
        if (postText.trim()) {
            const newPost = {
                author: "You",
                title: "Community Member",
                timeAgo: "now",
                verified: false,
                content: postText,
                reactions: 0,
                comments: 0,
                reposts: 0,
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            }
            setSocialPosts([newPost, ...socialPosts])
            setPostText('')
        }
    }

    const tabConfig = {
        social: { label: 'Social Posts', icon: '💬', color: 'from-blue-500 to-indigo-600' },
        articles: { label: 'Articles', icon: '📝', color: 'from-green-500 to-emerald-600' },
        videos: { label: 'Videos', icon: '🎥', color: 'from-red-500 to-pink-600' }
    }

    const renderSocialPosts = () => (
        <div className="space-y-6">
            {/* Create Post Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30">
                <div className="flex items-start space-x-4">
                    <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" 
                        alt="Your avatar" 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            placeholder="Start a post..."
                            className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none resize-none"
                            rows="3"
                        />
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex space-x-4">
                                <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                                    <span className="text-lg">🎥</span>
                                    <span className="font-medium">Video</span>
                                </button>
                                <button className="flex items-center space-x-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                                    <span className="text-lg">📷</span>
                                    <span className="font-medium">Photo</span>
                                </button>
                                <button className="flex items-center space-x-2 text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors">
                                    <span className="text-lg">📝</span>
                                    <span className="font-medium">Write article</span>
                                </button>
                            </div>
                            <button
                                onClick={handlePostSubmit}
                                disabled={!postText.trim()}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700 transition-all"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Posts */}
            {socialPosts.map((post, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <img 
                                    src={post.avatar} 
                                    alt={post.author} 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                        {post.verified && <span className="text-blue-500">✓</span>}
                                    </div>
                                    <p className="text-sm text-gray-600">{post.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{post.timeAgo} • 🌐</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <span className="text-xl">⋯</span>
                            </button>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-6 pb-4">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium">
                            ...more
                        </button>
                    </div>

                    {/* Post Stats */}
                    <div className="px-6 pb-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <span className="flex">👍❤️💡</span>
                                <span>{post.reactions}</span>
                            </div>
                            <div className="flex space-x-4">
                                <span>{post.comments} comments</span>
                                <span>{post.reposts} reposts</span>
                            </div>
                        </div>
                    </div>

                    {/* Post Actions */}
                    <div className="border-t border-gray-100 px-6 py-3">
                        <div className="flex items-center justify-around">
                            <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                <span className="text-lg">👍</span>
                                <span className="font-medium">Like</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                <span className="text-lg">💬</span>
                                <span className="font-medium">Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                <span className="text-lg">🔄</span>
                                <span className="font-medium">Repost</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                                <span className="text-lg">📤</span>
                                <span className="font-medium">Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    const renderArticles = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.map((article, index) => {
                const previewContent = article.content.substring(0, 100);
                const isContentLong = article.content.length > 100;
                const showFullContent = expandedIndex.includes(`article-${index}`);

                return (
                    <div 
                        key={index} 
                        className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className={`${showFullContent ? 'h-auto' : 'h-80'} 
                        bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30
                        hover:bg-white/90 transition-all duration-300 cursor-pointer
                        hover:border-green-200 group overflow-hidden relative`}>
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-3">
                                    <span className="text-lg">📝</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Article</span>
                                </div>
                                <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug group-hover:text-green-800 transition-colors duration-300">
                                    {article.title}
                                </h3>

                                <div className="mb-4">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {showFullContent ? article.content : `${previewContent}...`}
                                    </p>
                                </div>

                                {isContentLong && (
                                    <button
                                        className="text-green-600 hover:text-green-700 font-semibold text-xs 
                                        hover:bg-green-50 px-2 py-1 rounded-lg transition-all duration-200"
                                        onClick={() => handleToggleContent(`article-${index}`)}
                                    >
                                        {showFullContent ? '📖 See Less' : '📚 See More'}
                                    </button>
                                )}

                                <div className="absolute bottom-6 right-6">
                                    <p className="text-xs text-slate-500 italic font-medium">
                                        ~ {article.author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )

    const renderVideos = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, index) => {
                const previewContent = video.content.substring(0, 100);
                const isContentLong = video.content.length > 100;
                const showFullContent = expandedIndex.includes(`video-${index}`);

                return (
                    <div 
                        key={index} 
                        className="transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className={`${showFullContent ? 'h-auto' : 'h-80'} 
                        bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30
                        hover:bg-white/90 transition-all duration-300 cursor-pointer
                        hover:border-red-200 group overflow-hidden relative`}>
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">🎥</span>
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Video</span>
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                        {video.duration}
                                    </span>
                                </div>

                                <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug group-hover:text-red-800 transition-colors duration-300">
                                    {video.title}
                                </h3>

                                <div className="mb-4">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {showFullContent ? video.content : `${previewContent}...`}
                                    </p>
                                </div>

                                {isContentLong && (
                                    <button
                                        className="text-red-600 hover:text-red-700 font-semibold text-xs 
                                        hover:bg-red-50 px-2 py-1 rounded-lg transition-all duration-200"
                                        onClick={() => handleToggleContent(`video-${index}`)}
                                    >
                                        {showFullContent ? '📖 See Less' : '▶️ See More'}
                                    </button>
                                )}

                                <div className="absolute bottom-6 right-6">
                                    <p className="text-xs text-slate-500 italic font-medium">
                                        ~ {video.author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )

    return (
        <div className="min-h-screen ">
            {/* Header Section */}
            <div className="pt-20 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Community Forum
                            </h1>
                            <p className="text-slate-600 mt-2">Connect, share, and learn together</p>
                        </div>
                        <button 
                            className={`bg-gradient-to-r ${tabConfig[activeTab].color} text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl 
                            transform hover:-translate-y-1 transition-all duration-300 ease-in-out`}
                            onClick={handleCreateContent}
                        >
                            {tabConfig[activeTab].icon} Create {tabConfig[activeTab].label.slice(0, -1)}
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30">
                        {Object.entries(tabConfig).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    activeTab === key
                                        ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105`
                                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-800'
                                }`}
                            >
                                <span className="text-lg">{config.icon}</span>
                                <span>{config.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out`}>
                            <div className="flex items-center justify-center py-20">
                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                                    <div className="flex items-center space-x-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                        <p className="text-slate-700 font-medium text-lg">Loading {tabConfig[activeTab].label}...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`transform ${isMounted ? 'opacity-100' : 'opacity-0 translate-y-5'} transition-all duration-800 ease-in-out`}>
                            {activeTab === 'social' && renderSocialPosts()}
                            {activeTab === 'articles' && renderArticles()}
                            {activeTab === 'videos' && renderVideos()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SampleSocial;