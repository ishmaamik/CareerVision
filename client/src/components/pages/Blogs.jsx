import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { getAllBlogs, getOneBlog, createBlog } from '../../api/blog/blog'
import { useNavigate } from 'react-router-dom'
const Blogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState([]);
    const navigate = useNavigate()

    const getBlogs = async () => {
        setLoading(true)
        const blogList = await getAllBlogs()
        if (blogList && Array.isArray(blogList)) {
            setBlogs(blogList)
            setLoading(false)
            console.log(blogList)
        }
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const handleToggleContent = (index) => {
        setExpandedIndex(prevState => prevState.includes(index) ? prevState.filter(expand => expand != index) : [...prevState, index]); // Toggle expand/collapse for each blog
    };

    if (loading) {
        // Show a loading state while the data is being fetched
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                    <p>Loading Blogs...</p>
                </div>
            </div>
        );
    }



    return (
        <>
            <div className="flex  mt-20 ml-99">
                <Button disableRipple variant="text" sx={{ height: '4px', color: 'gray', ":hover": { backgroundColor: 'transparent' }, ":focus-visible": { outline: 'none' } }} onClick={() => navigate('/blog/:id')} >
                    Create New Blog
                </Button>
            </div>

            <div className='flex ml-20'>
                <div className="flex flex-wrap gap-4 items-start">
                    {
                        blogs.length > 0 ? blogs.map((p, index) => {

                            const previewContent = p.content.substring(0, 100); // Limit content to 200 chars for preview
                            const isContentLong = p.content.length > 100;
                            const showFullContent = expandedIndex.includes(index);

                            return (
                                <>
                                    <div key={index} className=" flex ml-3 mt-12">
                                        <div className={`break-words ${showFullContent ? 'h-auto' : 'h-40'} w-60  rounded-lg bg-white p-4 shadow-lg`}>
                                            <b className='text-xs justify-center'>{p.title}</b>

                                            {/*Content*/}

                                            <div className="mt-2">
                                                <p style={{fontSize:'11px'}}>{showFullContent ? p.content : `${previewContent}...`}</p>
                                            </div>
                                            {isContentLong && (
                                                <Button disableRipple variant="text" sx={{ height: '4px', color: 'gray', ":hover": { backgroundColor: 'transparent' }, ":focus-visible": { outline: 'none' } }} onClick={() => handleToggleContent(index)} >

                                                    {showFullContent ? 'See Less' : 'See More'}
                                                </Button>
                                            )}

                                            <i className='text-xs block mt-2 pr-1'>~{p.author}</i>
                                        </div>
                                    </div>
                                </>
                            );
                        })

                            :

                            <div className="fixed  left-1/2 transform -translate-x-1/2  flex items-center justify-center min-h-screen">
                                <div className="w-full max-w-2xl rounded-lg bg-white py-6 px-20 shadow-lg">
                                    <p>No Blogs Currently Available</p>
                                </div>
                            </div>
                    }


                </div>


            </div >
        </>
    )
}

export default Blogs;