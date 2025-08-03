import axios from 'axios'

export const handleProfilePictureUpload = async ({ 
    e, 
    user, 
    userId, 
    setSuccess, 
    setError, 
    setProfilePictureUrl, 
    setProfilePictureUploading 
}) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, and GIF images are allowed');
        return;
    }

    // Validate file size (5MB max)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
        setError('File size should not exceed 5MB');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
        setProfilePictureUploading(true);
        setError(null);

        // Upload the profile picture
        const uploadResponse = await axios.post(
            'http://localhost:8080/api/profile-picture/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setSuccess(true);
        setProfilePictureUrl(uploadResponse.data.url);
        
        // Optional: Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
        setProfilePictureUploading(false);
    }
};

export const handleDeleteProfilePicture = async ({ 
    user, 
    userId, 
    setSuccess, 
    setError, 
    setProfilePictureUrl 
}) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/profile-picture/delete/${userId}`
        );
        
        setProfilePictureUrl(null);
        setSuccess(true);
        
        // Optional: Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
        
        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete profile picture');
        throw error;
    }
};
