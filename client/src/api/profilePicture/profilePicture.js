import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setProfilePictureUrl, setProfilePictureUploading} from '../../redux/profileSlice.js'
import {setError, setSuccess} from '../../redux/successSlice.js'

export const useProfilePictureUpload=()=>{

    const dispatch= useDispatch()

    const handleProfilePictureUpload = async ({ 
        e,  
        userId
    }) => {
        const file = e.target.files[0];
        
    
        if (!file) return;
    
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            dispatch(setError('Only JPEG, PNG, and GIF images are allowed'));
            return;
        }
    
        // Validate file size (5MB max)
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
            dispatch(setError('File size should not exceed 5MB'));
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
    
        try {
            dispatch(setProfilePictureUploading(true));
            dispatch(setError(null));
    
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
    
            dispatch(setSuccess(true));
            dispatch(setProfilePictureUrl(uploadResponse.data.url));
            
            // Optional: Clear success message after 5 seconds
            setTimeout(() => dispatch(setSuccess(false)), 5000);
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to upload profile picture'));
        } finally {
            dispatch(setProfilePictureUploading(false));
        }
    };
    
    const handleDeleteProfilePicture = async ({ 
        userId 
    }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/profile-picture/delete/${userId}`
            );
            
            dispatch(setProfilePictureUrl(null));
            dispatch(setSuccess(true));
            
            // Optional: Clear success message after 5 seconds
            setTimeout(() => dispatch(setSuccess(false)), 5000);
            
            return response.data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to delete profile picture'));
            throw error;
        }
    };

    return {handleProfilePictureUpload, handleDeleteProfilePicture}
}


