import axios from 'axios'

export const handleProfilePictureUpload = async (e, user, userId, setSuccess,  setError, setProfilePictureUrl, setProfilePictureUploading) => {
    const file = e.target.files[0];
    if (!file) {
        setError('No file selected');
        return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
        return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
        setError(`File too large. Maximum size is ${maxSizeInBytes / 1024 / 1024}MB`);
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
        setProfilePictureUploading(true);
        setError(null);
        console.log('Starting profile picture upload', { 
            fileName: file.name, 
            fileType: file.type, 
            fileSize: file.size 
        });

        const response = await axios.post(
            'http://localhost:8080/api/profile-picture/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // Add timeout to catch network issues
                timeout: 10000,
                // Ensure CORS credentials are handled
                withCredentials: true
            }
        );

        console.log('Upload response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });

        if (response.data.status === 'success') {
            const uploadedUrl = response.data.url;
            console.log('Profile picture uploaded successfully:', uploadedUrl);
            
            // Validate and set URL
            if (uploadedUrl && typeof uploadedUrl === 'string') {
                // Ensure the URL is a full URL
                const fullUrl = uploadedUrl.startsWith('http') 
                    ? uploadedUrl 
                    : `https://${uploadedUrl}`;

                console.log('Processed profile picture URL:', fullUrl);

                // Verify image accessibility
                try {
                    const imageResponse = await fetch(fullUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'image/*'
                        }
                    });

                    if (!imageResponse.ok) {
                        throw new Error('Image not accessible');
                    }

                    // Update user object and local storage
                    const updatedUser = { 
                        ...user, 
                        profilePictureUrl: fullUrl 
                    };
                    
                    // Update both local state and local storage
                    setProfilePictureUrl(fullUrl);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                } catch (imageError) {
                    console.error('Image accessibility check failed:', imageError);
                    setError('Failed to verify uploaded image');
                    setProfilePictureUrl(null);
                }
            } else {
                console.error('Invalid profile picture URL received');
                setProfilePictureUrl(null);
                setError('Failed to process profile picture URL');
            }
        } else {
            // Handle non-success responses
            const errorMessage = response.data.message || 'Upload failed for unknown reason';
            console.error('Upload failed:', errorMessage);
            setError(errorMessage);
            setProfilePictureUrl(null);
        }
    } catch (error) {
        // Comprehensive error logging
        console.error('Profile picture upload error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        // Detailed error messages
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data.message || `Upload failed with status ${error.response.status}`);
        } else if (error.request) {
            // The request was made but no response was received
            setError('No response received from server. Check your network connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            setError(`Error setting up upload: ${error.message}`);
        }
        
        // Ensure profile picture is reset
        setProfilePictureUrl(null);
    } finally {
        setProfilePictureUploading(false);
    }
};

export const handleDeleteProfilePicture = async (user, userId, setSuccess,  setError, setProfilePictureUrl) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/profile-picture/delete/${userId}`
        );

        if (response.data.status === 'success') {
            setProfilePictureUrl('');
            // Update local storage user data
            const updatedUser = { ...user, profilePictureUrl: null };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    } catch (error) {
        setError(error.response?.data?.message || "Failed to delete profile picture");
    }
};
