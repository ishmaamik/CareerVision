import React, { useContext, useState, useEffect, useCallback } from 'react'
import ishu from '../../assets/siyam.jpg'
import axios from 'axios'
import { handleFileUpload } from '../../api/resume/resume.js'
import { FaFilePdf, FaTrash, FaSync, FaEye, FaDownload, FaCamera } from 'react-icons/fa';
import { deleteResume, updateResume } from '../../api/resume/resume.js'
import { handleDeleteProfilePicture, handleProfilePictureUpload } from '../../api/profilePicture/profilePicture.js';
const Profile = () => {

    const [isMounted, setMounted] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hasResume, setHasResume] = useState(false);
    const [resumeUrl, setResumeUrl] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [profilePictureUploading, setProfilePictureUploading] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);

    const checkProfilePictureStatus = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/profile-picture/user/${userId}`);
            console.log('Profile Picture Status Response:', response.data);
            
            // Reset image load error
            setImageLoadError(false);

            // Check if the response indicates a profile picture exists and has a valid URL
            if (response.data.hasProfilePicture && response.data.profilePictureUrl) {
                const pictureUrl = response.data.profilePictureUrl.trim();
                console.log('Setting profile picture URL:', pictureUrl);
                
                // Only set if the URL is not an empty string
                setProfilePictureUrl(pictureUrl);
            } else {
                console.log('No profile picture found for user');
                setProfilePictureUrl(null);
            }
        } catch (err) {
            console.error("Error checking profile picture status:", err);
            // More detailed error logging
            if (err.response) {
                console.error('Server responded with error:', err.response.data);
                setError(`Failed to check profile picture: ${err.response.data.message || `Status ${err.response.status}`}`);
            } else if (err.request) {
                console.error('No response received:', err.request);
                setError('No response received when checking profile picture. Check your network connection.');
            } else {
                console.error('Error setting up request:', err.message);
                setError(`Error checking profile picture: ${err.message}`);
            }
            
            // Ensure a default state
            setProfilePictureUrl(null);
        }
    }, [userId]);

    const handleImageError = () => {
        console.error('Failed to load profile picture', {
            currentUrl: profilePictureUrl,
            userStoredUrl: user.profilePictureUrl,
            localStorageUser: JSON.parse(localStorage.getItem('user'))
        });
        
        // Log additional context about the image source
        const imgElement = document.querySelector('img[alt="Profile"]');
        if (imgElement) {
            console.error('Image element details:', {
                src: imgElement.src,
                naturalWidth: imgElement.naturalWidth,
                naturalHeight: imgElement.naturalHeight
            });
        }

        // Attempt to validate and fix the URL
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const potentialUrls = [
            profilePictureUrl, 
            storedUser?.profilePictureUrl, 
            user.profilePictureUrl
        ];

        console.log('Potential URLs to validate:', potentialUrls);

        // Find the first valid-looking URL
        const validUrl = potentialUrls.find(url => 
            url && 
            typeof url === 'string' && 
            url.trim() !== '' && 
            (url.startsWith('http://') || url.startsWith('https://'))
        );

        if (validUrl) {
            console.log('Attempting to use validated URL:', validUrl);
            
            // Try to fetch the image to verify accessibility
            fetch(validUrl, { 
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'image/*'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Image URL is accessible');
                    setProfilePictureUrl(validUrl);
                } else {
                    console.error('Image URL is not accessible', response.status);
                    throw new Error('Image not accessible');
                }
            })
            .catch(error => {
                console.error('Error verifying image URL:', error);
                setImageLoadError(true);
                setProfilePictureUrl(null);
            });
        } else {
            console.error('No valid profile picture URL found');
            setImageLoadError(true);
            setProfilePictureUrl(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        checkResumeStatus();
        checkProfilePictureStatus();
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, [checkProfilePictureStatus]);

    useEffect(() => {
        checkProfilePictureStatus();
    }, [profilePictureUrl, checkProfilePictureStatus]);

    const checkResumeStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/resume/user/${userId}`);
            if (response.data.hasResume) {
                setHasResume(true);
                setResumeUrl(response.data.resumeUrl);
            }
        } catch (err) {
            console.error("Error checking resume status:", err);
        }
    };


    return (
        <>
            <div className={`flex transition-all ml-60 duration-800 ease-in-out ${isMounted ? `opacity-100 translate-y-0` : `opacity-0 translate-y-5`}`}>
                <div>
                    <div className="relative top-30 right-20 hover:-translate-y-2 ease-in-out duration-300 shadow-2xl">
                        <div className="relative w-130  rounded-lg  bg-white " >

                            <div className='relative bg-gray-100 flex w-full h-15 whitespace-nowrap rounded-lg' >
                                <p className="font-semibold absolute left-4 top-2">Your Profile</p>
                                <p className="   whitespace-nowrap absolute right-4">Joined 20/07/25</p>

                            </div>

                            <div className=''>
                                <div className='relative bg-white h-50 rounded-lg'>
                                    <img
                                        className='absolute left-2 top-5 w-16 h-16 object-cover'
                                        style={{ borderRadius: '50%' }}
                                        src={imageLoadError || !profilePictureUrl ? '/default-profile.png' : profilePictureUrl}
                                        alt="Profile"
                                        onError={handleImageError}
                                        onLoad={() => {
                                            console.log('Profile picture loaded successfully', {
                                                url: profilePictureUrl,
                                                imageLoadError
                                            });
                                        }}
                                    />
                                    <label className="absolute left-12 top-14 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100">
                                        <FaCamera className="text-gray-600" size={12} />
                                        <input
                                            type="file"
                                            onChange={(e)=>handleProfilePictureUpload(e, user, userId, setSuccess,  setError, setProfilePictureUrl, setProfilePictureUploading)}
                                            accept="image/*"
                                            className="hidden"
                                            disabled={profilePictureUploading}
                                        />
                                    </label>
                                    {profilePictureUrl && !imageLoadError && (
                                        <button
                                            onClick={()=>handleDeleteProfilePicture(user, userId, setSuccess,  setError, setProfilePictureUrl)}
                                            className="absolute left-12 top-14 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                                            disabled={profilePictureUploading}
                                        >
                                            <FaTrash className="text-red-500" size={12} />
                                        </button>
                                    )}
                                    <p className='absolute left-2 top-24  '>{user.name}</p>
                                    <p className='absolute left-2 top-32'>01696969420</p>
                                </div>

                                <div className="absolute ml-60 -mt-40 flex flex-col gap-2">
                                    {hasResume ? (
                                        <>
                                            <div className="flex items-center  gap-2 text-blue-500">
                                                <FaFilePdf size={24} />
                                                <span>Resume Available</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <a
                                                    href={resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: 'white' }}
                                                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    <FaEye /> View
                                                </a>
                                                <a
                                                    href={`${resumeUrl}?download=true`}
                                                    style={{ color: 'white' }}
                                                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                >
                                                    <FaDownload /> Download
                                                </a>
                                                <label className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer">
                                                    <FaSync /> Update
                                                    <input
                                                        type="file"
                                                        onChange={async (e) => {
                                                            try {
                                                                await updateResume({
                                                                    e,
                                                                    userId,
                                                                    setUploading,
                                                                    setError,
                                                                    setSuccess,
                                                                    setHasResume,
                                                                    setResumeUrl
                                                                });
                                                                await checkResumeStatus(); // Refresh status
                                                            } catch (error) {
                                                                setError(error.message);
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
                                                            await deleteResume({
                                                                userId,
                                                                setHasResume,
                                                                setSuccess,
                                                                setResumeUrl
                                                            });
                                                        } catch (error) {
                                                            setError(error.message);
                                                        }
                                                    }}
                                                    className="flex items-center gap-1 bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                                                    disabled={uploading}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center">
                                            {uploading ? 'Uploading...' : 'Upload Resume'}
                                            <input
                                                type="file"
                                                onChange={async (e) => {
                                                    try {
                                                        await handleFileUpload({
                                                            e,
                                                            userId,
                                                            setUploading,
                                                            setError,
                                                            setSuccess,
                                                            setHasResume,
                                                            setResumeUrl
                                                        });
                                                        await checkResumeStatus(); // Refresh status
                                                    } catch (error) {
                                                        setError(error.message);
                                                    }
                                                }}
                                                accept=".pdf"
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                    )}

                                    {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                                    {success && (
                                        <p className="text-green-500 text-sm">
                                            {success === true ? 'Operation successful!' : success}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative top-50 right-20 hover:-translate-y-2 ease-in-out duration-300 shadow-xl">
                        <div className="relative w-130 h-auto max-h-70  rounded-lg  bg-white shadow-lg">

                            <div className='relative bg-gray-100 flex w-full h-14 whitespace-nowrap rounded-lg' >
                                <p className="font-semibold absolute left-4 top-2">Email Address</p>
                            </div>


                            <div className='relative bg-white h-35 rounded-lg whitespace-nowrap'>
                                <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-30 h-7'>Primary Mail</p>
                                <p className='absolute left-2 top-15  '>{user.email}</p>
                                <p className='absolute left-2 top-23'>siyambhuiyan@gmail.com</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div>
                    <div>

                        <div className="relative top-30 left-20 hover:-translate-y-2 duration-300 ease-in-out shadow-xl">
                            <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white shadow-lg">

                                <div className='relative bg-gray-100 flex w-full h-14 whitespace-nowrap rounded-lg' >
                                    <p className="font-semibold absolute left-4 top-1">Phone Number</p>
                                </div>


                                <div className='relative bg-white h-35 rounded-lg whitespace-nowrap'>
                                    <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-35 h-7'>Primary Number</p>
                                    <p className='absolute left-2 top-15  '>01696969420</p>
                                    <p className='absolute left-2 top-23'>01717171717</p>
                                </div>

                            </div>
                        </div>

                        <div className="relative top-50 left-20 hover:-translate-y-2 ease-in-out duration-300 shadow-xl">
                            <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white shadow-lg">

                                <div className='relative bg-gray-100 flex w-full h-14 whitespace-nowrap rounded-lg' >
                                    <p className="font-semibold absolute left-4 top-2">Address</p>

                                </div>


                                <div className='relative bg-white h-35 rounded-lg'>
                                    <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-35 h-7'>Primary Address</p>
                                    <p className='absolute left-2 top-15  '>House 14, Road 6, Dhanmondi, Dhaka-1205</p>
                                    <p className='absolute left-2 top-23'>IUT Male Residence, Board Bazar, Gazipur</p>
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;