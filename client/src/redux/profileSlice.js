import {createSlice} from '@reduxjs/toolkit'

const initialState={
    hasResume: false,
    resumeUrl: '',
    profilePictureUrl: null,
    profilePictureUploading: null,
    imageLoadError: false,
    currentLocation: null
}

const profileSlice= createSlice({
    name:'profile',
    initialState: initialState,
    reducers:{
        setHasResume: (state, action)=>{
            state.hasResume= action.payload.hasResume
            state.resumeUrl= action.payload.resumeUrl
        },

        setProfilePictureUrl: (state, action)=>{
            state.profilePictureUrl = action.payload;
            state.profilePictureUploading= false
        },

        setProfilePictureUploading: (state, action)=>{
            state.profilePictureUploading= action.payload   //since setProfilePictureUploading(true or false) and not multiple values inside an object e.g. setProfilePictureUploading({profileUploading: true})
        },
        
        setImageLoadError:(state, action)=>{
            state.imageLoadError= action.payload
        },

        setCurrentLocation: (state, action) =>{
            state.currentLocation= action.payload
        }
    }
})

export const {
    setCurrentLocation,
    setHasResume,
    setImageLoadError,
    setProfilePictureUploading,
    setProfilePictureUrl
} = profileSlice.actions

export default profileSlice.reducer