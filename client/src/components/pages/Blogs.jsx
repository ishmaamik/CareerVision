import React, { useEffect, useState } from 'react'
import { getAllBlogs, getOneBlog, createBlog } from '../../api/blog/blog'
const Blogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);

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
        <div className="flex flex-wrap gap-4 justify-center">
            {
                blogs.length > 0 ? blogs.map((p, index) => {
                    return (
                        <div key={index} className=" flex items-center min-h-screen">
                          <div className="w-full break-words max-w-xl rounded-lg bg-white py-2 px-3 shadow-lg">
                            <b className='justify-center'>{p.title}</b>
                            <h3>{p.content}</h3>
                            <i>~{p.author}</i>
                          </div>
                        </div>
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
        </>
    )
}

export default Blogs;