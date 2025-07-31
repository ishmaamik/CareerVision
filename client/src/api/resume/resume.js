
import axios from 'axios'

export const handleFileUpload = async ({ e, userId, setUploading, setError, setUploadSuccess }) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId); // Replace with actual user ID from auth context

    try {
        setUploading(true);
        setError(null);

        const response = await axios.post(
            'http://localhost:8080/api/resume/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setUploadSuccess(true);
        setUploading(false)
        // Optionally refresh user data here
    } catch (error) {
        setError(error.response?.data?.message);
    } finally {
        setUploading(false);
    }
};

export const deleteResume = async ({userId, setHasResume, setSuccess, setResumeUrl}) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/api/resume/delete/${userId}`
        );
        setHasResume(false)
        setResumeUrl('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete resume');
    }
};

export const updateResume = async ({ e, userId, setUploading, setError, setSuccess }) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    try {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);

        const response = await axios.put(
            'http://localhost:8080/api/resume/update',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setSuccess(true);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update resume');
    } finally {
        setUploading(false);
    }
};
