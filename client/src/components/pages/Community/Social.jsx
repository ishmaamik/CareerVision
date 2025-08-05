import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Photo as Photo, PeopleAlt as People, Work as Work, Login as Login, Logout as Logout, Person as Person, AppRegistration as Signup } from "@mui/icons-material"
import { Button } from '@mui/material'
import { FaCamera } from 'react-icons/fa';
import { getAllPosts, handlePost } from '../../../api/social/social'
const Social = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id
    const [writing, setWriting] = useState('')
    const [posts, setPosts] = useState([])
    const [imageFile, setImageFile] = useState(null)

    const handleSubmit = async () => {
        try {
            // 1. First create the post (without image)
            const postData = {
                postedBy: { id: userId }, // Only send ID
                post: writing,
                postTime: new Date().toISOString(),
                imageUrl: null // Initially null
            };

            // Create the post and get its ID
            const createdPost = await handlePost(postData);

            // 2. If there's an image, upload it with the post ID
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("postId", createdPost.id); // Use the new post ID

                const uploadResponse = await fetch("http://localhost:8080/api/post-picture/upload", {
                    method: "POST",
                    body: formData
                });

                const result = await uploadResponse.json();

                if (result.status === "success") {
                    // 3. Update the post with the image URL
                    await updatePostImage(createdPost.id, result.url);
                }
            }

            // Refresh the posts list
            getAllUserPosts();
            setWriting('');
            setImageFile(null);
        } catch (error) {
            console.error("Post creation failed:", error);
        }
    };

    // Add this function to your API service
    const updatePostImage = async (postId, imageUrl) => {
        try {
            const response = await axios.patch(`${BASE_URL}/${postId}/image`, { imageUrl });
            return response.data;
        } catch (error) {
            console.error("Error updating post image:", error);
            throw error;
        }
    };


    const getAllUserPosts = async () => {
        try {
            const posts = await getAllPosts(userId)
            setPosts(posts)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUserPosts()
    }, [])


    return (
        <>
            <div>
                <div className='w-210 ml-32 h-32 mt-4 bg-white rounded-lg'>
                    <div className='flex'>
                        <img className='h-16 ml-4 w-16 mt-4' style={{ borderRadius: '50%' }} src={user?.profilePictureUrl} />
                        <input
                            value={writing}
                            onChange={(e) => setWriting(e.target.value)}
                            className='mt-4 ml-4 mr-4 rounded-lg w-200 bg-neutral-100'
                            placeholder='Start writing post...'
                        />
                    </div>
                    <div className='flex items-center justify-between px-4'>
                        <label className="bg-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-100 flex items-center">
                            <FaCamera className="text-gray-600 mr-2" size={12} />
                            <span>Photo</span>
                            <input
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                accept="image/*"
                                className='hidden'
                            />
                        </label>
                        <Button onClick={handleSubmit}>Post</Button>
                    </div>
                </div>

                {posts?.map((p, ind) => (
                    <div key={ind} className={`${p.imageUrl ? 'h-140' : 'h-40'} w-210 ml-32 mt-4 bg-white rounded-lg`}>
                        <div className='flex'>
                            <img className='h-16 ml-4 w-16 mt-4' style={{ borderRadius: '50%' }} src={user.profilePictureUrl} />
                            <div className='flex flex-col mt-4 ml-4'>
                                <p>{p.postedBy.name}</p>
                                <p>{p.postTime}</p>
                            </div>
                        </div>
                        <p className='ml-4 mt-4'>{p.post}</p>
                        {p.imageUrl && <img className='rounded-lg h-100 ml-4 w-200 mt-4' src={p.imageUrl} alt="Post content" />}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Social;