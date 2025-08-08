import axios from 'axios';
import { setUploading, setUploadSuccess } from '../../redux/uploadSlice.js';
import { setSuccess, setError } from '../../redux/successSlice.js';
import { setHasResume} from '../../redux/profileSlice.js';
import {useDispatch} from 'react-redux'

export const useFileUpload=()=>{
    const dispatch= useDispatch()

    const handleFileUpload = async ({ e, userId}) => {
        const file = e.target.files[0];
        if (!file) return;
    
        // Validate file type
        if (file.type !== 'application/pdf') {
            dispatch(setError('Only PDF files are allowed'));
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
    
        try {
            dispatch(setUploading(true));
            dispatch(setError(null));
    
            // 1. Upload the file
            const uploadResponse = await axios.post(
                'http://localhost:8080/api/resume/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            // 2. Extract and save CV data
            await axios.get(
                `http://localhost:8080/api/resume/extract/${userId}`
            );
    
            dispatch(setUploadSuccess(true));
            dispatch(setHasResume({ hasResume: true, resumeUrl: uploadResponse.data.url }));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Upload failed'));
        } finally {
            dispatch(setUploading(false));
        }
    };
    
    const updateResume = async ({ e, userId}) => {
        const file = e.target.files[0];
        if (!file) return;
    
        dispatch(setError(null));
        try {
            dispatch(setUploading(true));
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);
    
            // 1. Update the file
            const updateResponse = await axios.put(
                'http://localhost:8080/api/resume/update',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            // 2. Extract and save updated CV data
            await axios.get(
                `http://localhost:8080/api/resume/extract/${userId}`
            );
    
            dispatch(setSuccess(true));
            dispatch(setHasResume({ hasResume: true, resumeUrl: updateResponse.data.url }));
            return updateResponse.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update resume');
        } finally {
            dispatch(setUploading(false));
        }
    };
    
    const deleteResume = async ({ userId}) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/resume/delete/${userId}`
            );
            dispatch(setHasResume({ hasResume: false, resumeUrl: '' }));
            dispatch(setSuccess(true));
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete resume');
        }
    };

    return {handleFileUpload, updateResume, deleteResume}
}

