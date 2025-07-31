
import axios from 'axios'

export const handleFileUpload = async ({ e, userId, setUploading, setError, setUploadSuccess, setHasResume, setResumeUrl }) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
        setUploading(true);
        setError(null);

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

        setUploadSuccess(true);
        setHasResume(true);
        setResumeUrl(uploadResponse.data.url);
    } catch (error) {
        setError(error.response?.data?.message);
    } finally {
        setUploading(false);
    }
};

export const updateResume = async ({ e, userId, setUploading, setError, setSuccess, setHasResume, setResumeUrl }) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);
    try {
        setUploading(true);
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

        setSuccess(true);
        setHasResume(true);
        setResumeUrl(updateResponse.data.url);
        return updateResponse.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update resume');
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

