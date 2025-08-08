import React, {useEffect, useCallback} from 'react'
import axios from 'axios'
import { FaTrash, FaCamera } from 'react-icons/fa'
import {setImageLoadError, setProfilePictureUrl} from '../../../redux/profileSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import { useProfilePictureUpload } from '../../../api/profilePicture/profilePicture.js'

const ProfilePicture = () => {

    const {handleProfilePictureUpload, handleDeleteProfilePicture} = useProfilePictureUpload()

    const {profilePictureUrl, imageLoadError, profilePictureUploading}= useSelector((state)=> state.profile)
    const {user}= useSelector((state)=>state.user)

    const dispatch= useDispatch()

    const checkProfilePictureStatus = useCallback(async () => {
        if (!user?.id) return;
        try {
            const response = await axios.get(`http://localhost:8080/api/profile-picture/user/${user?.id}`);
            dispatch(setImageLoadError(false));
            if (response.data.hasProfilePicture && response.data.profilePictureUrl) {
                dispatch(setProfilePictureUrl(response.data.profilePictureUrl.trim()));
            } else {
                dispatch(setProfilePictureUrl(null));
            }
        } catch (err) {
            console.error("Error checking profile picture status:", err);
            dispatch(setProfilePictureUrl(null));
        }
    }, [user?.id]);

    useEffect(()=>{
        checkProfilePictureStatus()
        console.log(user)
    },[user?.id, dispatch])

    return (
        <>
            <div className="relative mr-6">
                <img
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                    src={imageLoadError || !profilePictureUrl ? '/default-profile.jpg' : profilePictureUrl}
                    alt="Profile"
                    onError={() => dispatch(setImageLoadError(true))}
                    crossOrigin="anonymous"
                />
                <div className="flex mt-4 space-x-2">
                    <label className="bg-white rounded-full p-2 shadow cursor-pointer hover:bg-gray-100">
                        <FaCamera className="text-gray-600" />
                        <input
                            type="file"
                            onChange={(e) => handleProfilePictureUpload({e, userId: user?.id})}
                            accept="image/*"
                            className="hidden"
                            disabled={profilePictureUploading}
                        />
                    </label>
                    {profilePictureUrl && !imageLoadError && (
                        <button
                            onClick={() => handleDeleteProfilePicture({userId: user?.id})}
                            className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                            disabled={profilePictureUploading}
                        >
                            <FaTrash className="text-red-500" />
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfilePicture;

