// postImageHandlers.js
import axios from 'axios';

export const handlePostImageUpload = async ({
    e,
    postId,
    setSuccess,
    setError,
    setImageUrl,
    setUploading
}) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, and GIF images are allowed');
        return;
    }

    // Validate file size (e.g., 5MB max)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
        setError('File size should not exceed 5MB');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', postId); // this param is required by backend

    try {
        setUploading(true);
        setError(null);

        const response = await axios.post(
            'http://localhost:8080/api/profile-picture/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setSuccess(true);
        setImageUrl(response.data.url);

        setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to upload post image');
    } finally {
        setUploading(false);
    }
};

export const handleDeletePostImage = async ({
    postId,
    setSuccess,
    setError,
    setImageUrl
}) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/profile-picture/delete/${postId}`
        );

        setImageUrl(null);
        setSuccess(true);

        setTimeout(() => setSuccess(false), 5000);

        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete post image');
        throw error;
    }
};
