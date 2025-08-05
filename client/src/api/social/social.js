// api/social/social.js
import axios from 'axios'

const BASE_URL = `http://localhost:8080/api/posts`

export const handlePost = async (postData, imageFile) => {
    try {
        const formData = new FormData();
        formData.append("postData", new Blob([JSON.stringify(postData)], {
            type: "application/json"
        }));
        
        if (imageFile) {
            formData.append("file", imageFile);
        }

        const response = await axios.post(BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const getAllPosts = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}