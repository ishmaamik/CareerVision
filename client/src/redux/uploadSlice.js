import { createSlice } from "@reduxjs/toolkit";

const initialState={
    uploading: false,
    uploadSuccess: false
}
const uploadSlice= createSlice({
    name:'upload',
    initialState: initialState,
    reducers:{
        setUploading: (state, action)=>{
            state.uploading= action.payload
        },
        setUploadSuccess: (state, action)=>{
            state.uploadSuccess= action.payload
        }
    }
})

export const {setUploadSuccess, setUploading}= uploadSlice.actions

export default uploadSlice.reducer