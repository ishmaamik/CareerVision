import { createSlice } from "@reduxjs/toolkit";

const initialState={
    success:false,
    error:false
}
const successSlice= createSlice({
    name:'success',
    initialState: initialState,
    reducers:{
        setSuccess: (state, action)=>{
            state.success= action.payload
        },

        setError: (state, action)=>{
            state.error= action.payload
        }
    }
})

export const {setSuccess, setError}= successSlice.actions

export default successSlice.reducer