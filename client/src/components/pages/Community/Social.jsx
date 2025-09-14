import React, { useEffect, useState, useCallback } from 'react'
import { 
    PhotoCamera, 
    FavoriteOutlined, 
    Favorite, 
    ChatBubbleOutline, 
    Share, 
    MoreVert,
    EmojiEmotions,
    Public,
    Lock,
    Group
} from "@mui/icons-material"
import { 
    Button, 
    TextField, 
    IconButton, 
    Menu, 
    MenuItem, 
    Chip, 
    Avatar, 
    Tooltip,
    Fade,
    Zoom
} from '@mui/material'
import { FaCamera, FaHeart, FaComment, FaShare, FaClock, FaGlobe } from 'react-icons/fa';
import { getAllPosts, handlePost } from '../../../api/social/social'
import { useTheme } from '../../../context/ThemeContext'
import { getThemeClasses, getComponentStyles } from '../../../styles/themes'
const Social = () => {
    const { isDarkMode } = useTheme()
    const themeClasses = getThemeClasses(isDarkMode)
    const componentStyles = getComponentStyles(isDarkMode)

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user?.id
    const [writing, setWriting] = useState('')
    const [posts, setPosts] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [posting, setPosting] = useState(false)
    const [likedPosts, setLikedPosts] = useState(new Set())
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedPost, setSelectedPost] = useState(null)
    const [visibility, setVisibility] = useState('public')
    const [mounted, setMounted] = useState(false)

    const BASE_URL = `http://localhost:8080/api/post`

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async () => {
        if (!writing.trim() && !imageFile) return
        
        setPosting(true)
        try {
            const postData = {
                postedBy: { id: userId },
                post: writing,
                postTime: new Date().toISOString(),
                imageUrl: null,
                visibility: visibility,
                likes: 0,
                comments: []
            };

            await handlePost(postData, imageFile);
            await getAllUserPosts();
            
            // Reset form
            setWriting('');
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error("Post creation failed:", error);
        } finally {
            setPosting(false)
        }
    };

    const getAllUserPosts = useCallback(async () => {
        if (!userId) return
        
        setLoading(true)
        try {
            const posts = await getAllPosts(userId)
            setPosts(posts || [])
        } catch (error) {
            console.log(error)
            setPosts([])
        } finally {
            setLoading(false)
        }
    }, [userId])

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onload = (e) => setImagePreview(e.target.result)
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setImagePreview(null)
    }

    const handleLike = (postId) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev)
            if (newSet.has(postId)) {
                newSet.delete(postId)
            } else {
                newSet.add(postId)
            }
            return newSet
        })
    }

    const formatTimeAgo = (dateString) => {
        const now = new Date()
        const postTime = new Date(dateString)
        const diffInMinutes = Math.floor((now - postTime) / (1000 * 60))
        
        if (diffInMinutes < 1) return 'Just now'
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
        return postTime.toLocaleDateString()
    }

    const handleMenuClick = (event, post) => {
        setAnchorEl(event.currentTarget)
        setSelectedPost(post)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedPost(null)
    }

    useEffect(() => {
        getAllUserPosts()
    }, [getAllUserPosts])

    if (!user) {
        return (
            <div className={`min-h-screen ${themeClasses.bg.primary} flex items-center justify-center`}>
                <div className={`${componentStyles.card} p-8 text-center max-w-md mx-auto`}>
                    <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}>
                        Please Login
                    </h2>
                    <p className={themeClasses.text.secondary}>
                        You need to be logged in to access the social feed.
                    </p>
                </div>
            </div>
        )
    }


    return (
        <div className={`min-h-screen ${themeClasses.bg.primary} transition-all duration-300`}>
            {/* Header */}
            <div className={`${themeClasses.bg.surface} shadow-lg sticky top-0 z-10 backdrop-blur-lg bg-opacity-95`}>
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <h1 className={`text-3xl font-bold ${themeClasses.text.primary} bg-gradient-to-r ${themeClasses.brand.gradient} bg-clip-text text-transparent`}>
                        Social Feed
                    </h1>
                    <p className={`${themeClasses.text.secondary} mt-1`}>
                        Connect with your professional network
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Post Creation Card */}
                <Fade in={true} timeout={800}>
                    <div className={`${componentStyles.card} p-6 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700`}>
                        <div className="flex items-start space-x-4">
                            <Avatar
                                src={user?.profilePictureUrl || '/default-profile.jpg'}
                                alt={user?.name}
                                sx={{ 
                                    width: 50, 
                                    height: 50,
                                    border: `3px solid ${isDarkMode ? '#22C55E' : '#D4A574'}`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                            />
                            <div className="flex-1 space-y-4">
                                <TextField
                                    value={writing}
                                    onChange={(e) => setWriting(e.target.value)}
                                    placeholder={`What's on your mind, ${user?.name}?`}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                    className={componentStyles.input}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: isDarkMode ? '#0E2B23' : '#FEFBF3',
                                            borderRadius: '12px',
                                            '& fieldset': {
                                                borderColor: isDarkMode ? '#1F4A3A' : '#E8DDD0',
                                                borderWidth: '2px',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: isDarkMode ? '#22C55E' : '#D4A574',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: isDarkMode ? '#22C55E' : '#D4A574',
                                                borderWidth: '2px',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: isDarkMode ? '#F0FDF4' : '#2A1810',
                                            fontSize: '16px',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: isDarkMode ? '#86EFAC' : '#6B5B47',
                                        },
                                    }}
                                />

                                {/* Image Preview */}
                                {imagePreview && (
                                    <Zoom in={true}>
                                        <div className="relative">
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-full max-h-64 object-cover rounded-xl shadow-lg"
                                            />
                                            <IconButton
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                                                size="small"
                                            >
                                                ×
                                            </IconButton>
                                        </div>
                                    </Zoom>
                                )}

                                {/* Post Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Tooltip title="Add Photo">
                                            <label className={`${componentStyles.button.secondary} cursor-pointer inline-flex items-center space-x-2 !py-2 !px-4`}>
                                                <PhotoCamera size="small" />
                                                <span className="text-sm">Photo</span>
                                                <input
                                                    type="file"
                                                    onChange={handleImageSelect}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                            </label>
                                        </Tooltip>
                                        
                                        <Chip
                                            icon={<Public />}
                                            label={visibility === 'public' ? 'Public' : 'Private'}
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setVisibility(prev => prev === 'public' ? 'private' : 'public')}
                                            className={`${themeClasses.border.primary} ${themeClasses.text.secondary} hover:${themeClasses.brand.bg} transition-all duration-200`}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={(!writing.trim() && !imageFile) || posting}
                                        className={componentStyles.button.primary}
                                        startIcon={posting ? <EmojiEmotions /> : <Share />}
                                    >
                                        {posting ? 'Posting...' : 'Share Post'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>

                {/* Loading State */}
                {loading && (
                    <div className={`${componentStyles.card} p-8 text-center`}>
                        <div className="animate-pulse space-y-4">
                            <div className={`h-4 ${themeClasses.bg.accent} rounded w-3/4 mx-auto`}></div>
                            <div className={`h-4 ${themeClasses.bg.accent} rounded w-1/2 mx-auto`}></div>
                        </div>
                        <p className={`${themeClasses.text.secondary} mt-4`}>Loading your feed...</p>
                    </div>
                )}

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.length > 0 ? posts.map((post, index) => (
                        <Fade in={true} timeout={800 + (index * 100)} key={post.id || index}>
                            <div className={`${componentStyles.card} p-6 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} transition-all duration-700 hover:shadow-2xl hover:-translate-y-1`}>
                                {/* Post Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <Avatar
                                            src={post.postedBy?.profilePictureUrl || '/default-profile.jpg'}
                                            alt={post.postedBy?.name}
                                            sx={{ 
                                                width: 45, 
                                                height: 45,
                                                border: `2px solid ${isDarkMode ? '#22C55E' : '#D4A574'}`,
                                            }}
                                        />
                                        <div>
                                            <h3 className={`font-semibold ${themeClasses.text.primary} hover:${themeClasses.brand.primary} cursor-pointer transition-colors`}>
                                                {post.postedBy?.name || 'Unknown User'}
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-sm ${themeClasses.text.muted} flex items-center space-x-1`}>
                                                    <FaClock size={12} />
                                                    <span>{formatTimeAgo(post.postTime)}</span>
                                                </span>
                                                {post.visibility === 'public' && (
                                                    <Tooltip title="Public post">
                                                        <FaGlobe size={12} className={themeClasses.text.muted} />
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <IconButton
                                        onClick={(e) => handleMenuClick(e, post)}
                                        className={`${themeClasses.text.muted} hover:${themeClasses.text.primary}`}
                                    >
                                        <MoreVert />
                                    </IconButton>
                                </div>

                                {/* Post Content */}
                                <div className="mb-4">
                                    {post.post && (
                                        <p className={`${themeClasses.text.primary} text-base leading-relaxed whitespace-pre-wrap`}>
                                            {post.post}
                                        </p>
                                    )}
                                    
                                    {post.imageUrl && (
                                        <Zoom in={true}>
                                            <div className="mt-4">
                                                <img 
                                                    src={post.imageUrl} 
                                                    alt="Post content" 
                                                    className="w-full max-h-96 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </Zoom>
                                    )}
                                </div>

                                {/* Post Actions */}
                                <div className={`flex items-center justify-between pt-4 border-t ${themeClasses.border.divider}`}>
                                    <div className="flex items-center space-x-6">
                                        <Tooltip title={likedPosts.has(post.id) ? "Unlike" : "Like"}>
                                            <Button
                                                onClick={() => handleLike(post.id)}
                                                startIcon={likedPosts.has(post.id) ? 
                                                    <Favorite className="text-red-500" /> : 
                                                    <FavoriteOutlined />
                                                }
                                                className={`${componentStyles.button.ghost} !text-sm ${likedPosts.has(post.id) ? '!text-red-500' : ''}`}
                                            >
                                                {post.likes || 0} {likedPosts.has(post.id) ? 'Liked' : 'Like'}
                                            </Button>
                                        </Tooltip>
                                        
                                        <Tooltip title="Comment">
                                            <Button
                                                startIcon={<ChatBubbleOutline />}
                                                className={`${componentStyles.button.ghost} !text-sm`}
                                            >
                                                {post.comments?.length || 0} Comment
                                            </Button>
                                        </Tooltip>
                                        
                                        <Tooltip title="Share">
                                            <Button
                                                startIcon={<Share />}
                                                className={`${componentStyles.button.ghost} !text-sm`}
                                            >
                                                Share
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )) : !loading && (
                        <Fade in={true} timeout={800}>
                            <div className={`${componentStyles.card} p-12 text-center`}>
                                <EmojiEmotions className={`text-6xl ${themeClasses.text.muted} mb-4`} />
                                <h3 className={`text-xl font-semibold ${themeClasses.text.primary} mb-2`}>
                                    No posts yet
                                </h3>
                                <p className={`${themeClasses.text.secondary} mb-6`}>
                                    Be the first to share something with your network!
                                </p>
                                <Button
                                    onClick={() => document.querySelector('textarea').focus()}
                                    className={componentStyles.button.primary}
                                >
                                    Create Your First Post
                                </Button>
                            </div>
                        </Fade>
                    )}
                </div>

                {/* Context Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <Share className="mr-2" /> Share Post
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Public className="mr-2" /> Copy Link
                    </MenuItem>
                    {selectedPost?.postedBy?.id === userId && (
                        <MenuItem onClick={handleMenuClose} className="text-red-600">
                            <span className="mr-2">🗑</span> Delete Post
                        </MenuItem>
                    )}
                </Menu>
            </div>
        </div>
    )
}

export default Social;