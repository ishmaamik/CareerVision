import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getAllBlogs, getOneBlog, createBlog } from "../../api/blog/blog";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setMounted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    setLoading(true);
    const blogList = await getAllBlogs();
    if (blogList && Array.isArray(blogList)) {
      setBlogs(blogList);
      setLoading(false);
      console.log(blogList);
    }
  };

  useEffect(() => {
    getBlogs();
    const timer = setTimeout(() => setMounted(true), 50);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  const handleToggleContent = (index) => {
    setExpandedIndex((prevState) =>
      prevState.includes(index)
        ? prevState.filter((expand) => expand != index)
        : [...prevState, index]
    );
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] pt-4">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-2">
              Community Blogs
            </h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base">
              Discover insights and stories from our community
            </p>
          </div>
          <button
            onClick={() => navigate("/blogs/newBlog")}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            Create New Blog
          </button>
        </div>

        {loading ? (
          <div
            className={`flex justify-center items-center min-h-[60vh] transition-all duration-800 ease-in-out ${
              isMounted ? `opacity-100` : `opacity-0 translate-y-5`
            }`}
          >
            <div className="themed-card p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)] mx-auto mb-4"></div>
              <p className="text-[var(--text-secondary)]">Loading blogs...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => {
                const previewContent = blog.content.substring(0, 100);
                const isContentLong = blog.content.length > 100;
                const showFullContent = expandedIndex.includes(index);

                return (
                  <div
                    key={index}
                    className={`themed-card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                      isMounted
                        ? `opacity-100 translate-y-0`
                        : `opacity-0 translate-y-5`
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-3 line-clamp-2">
                        {blog.title}
                      </h3>

                      <div className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                        <p className={showFullContent ? "" : "line-clamp-4"}>
                          {showFullContent
                            ? blog.content
                            : `${previewContent}...`}
                        </p>
                      </div>

                      {isContentLong && (
                        <button
                          onClick={() => handleToggleContent(index)}
                          className="text-[var(--accent-primary)] hover:text-blue-500 text-sm font-medium transition-colors duration-200 mb-4"
                        >
                          {showFullContent ? "Show Less" : "Read More"}
                        </button>
                      )}

                      <div className="border-t border-[var(--border-color)] pt-4">
                        <p className="text-xs text-[var(--text-secondary)] flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {blog.author}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full">
                <div
                  className={`flex justify-center items-center min-h-[50vh] transition-all duration-800 ease-in-out ${
                    isMounted ? `opacity-100` : `opacity-0 translate-y-5`
                  }`}
                >
                  <div className="themed-card p-12 text-center max-w-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      No Blogs Available
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                      Be the first to share your insights with the community
                    </p>
                    <button
                      onClick={() => navigate("/blogs/newBlog")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      Create First Blog
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
