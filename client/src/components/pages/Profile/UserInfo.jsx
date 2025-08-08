import React, { useCallback, useEffect } from 'react';
import { FaEye, FaFilePdf, FaDownload, FaTrash, FaSync } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useFileUpload } from '../../../api/resume/resume.js';
import {setError } from '../../../redux/successSlice.js';
import { setHasResume } from '../../../redux/profileSlice.js';

const UserInfo = () => {
    const dispatch = useDispatch();
    const { handleFileUpload, updateResume, deleteResume } = useFileUpload();

    // Get state from Redux store
    const { uploading} = useSelector((state) => state.upload);
    const { success, error } = useSelector((state) => state.success);
    const { hasResume, resumeUrl } = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user.user)

    const checkResumeStatus = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/resume/user/${user?.id}`
            );
            if (response.data.hasResume) {
                dispatch(setHasResume({
                    hasResume: true,
                    resumeUrl: response.data.resumeUrl
                }));
            }
        } catch (err) {
            console.error("Error checking resume status:", err);
            dispatch(setError("Failed to check resume status"));
        }
    }, [user?.id, dispatch]);

    useEffect(()=>{
        checkResumeStatus()
    }, [])


    return (
        <>
            {/* User Info */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
                <p className="text-gray-600 mb-6">01696969420</p>

                {/* Resume Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    {hasResume ? (
                        <>
                            <div className="flex items-center text-blue-500 mb-3">
                                <FaFilePdf size={20} className="mr-2" />
                                <span>Resume Available</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={resumeUrl}
                                    style={{color:'white'}}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                                >
                                    <FaEye /> View
                                </a>
                                <a
                                    href={`${resumeUrl}?download=true`}
                                    style={{color:'white'}}
                                    className="flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                                >
                                    <FaDownload /> Download
                                </a>
                                <label style={{color:'white'}} className="flex items-center justify-center gap-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 cursor-pointer">
                                    <FaSync /> Update
                                    <input
                                        type="file"
                                        onChange={async (e) => {
                                            try {
                                                await updateResume({ e, userId: user?.id });
                                                await checkResumeStatus();
                                            } catch (error) {
                                                dispatch(setError(error.message));
                                            }
                                        }}
                                        accept=".pdf"
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                                <button
                                    onClick={async () => {
                                        try {
                                            await deleteResume({ userId: user?.id });
                                            await checkResumeStatus();
                                        } catch (error) {
                                            dispatch(setError(error.message));
                                        }
                                    }}
                                    style={{color:'white', backgroundColor:'red'}}
                                    className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                    disabled={uploading}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </>
                    ) : (
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                            {uploading ? 'Uploading...' : 'Upload Resume'}
                            <input
                                type="file"
                                onChange={async (e) => {
                                    try {
                                        await handleFileUpload({ e, userId: user?.id });
                                        await checkResumeStatus();
                                    } catch (error) {
                                        dispatch(setError(error.message));
                                    }
                                }}
                                accept=".pdf"
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm mt-2">
                            {success === true ? 'Operation successful!' : success}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserInfo;