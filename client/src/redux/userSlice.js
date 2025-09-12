import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // Update localStorage when user changes
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        updateUserLocation: (state, action) => {
            if (state.user) {
                state.user.lat = action.payload.lat;
                state.user.lon = action.payload.lon;
                // Also update localStorage
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        }
    }
})

export const { setUser, updateUserLocation } = userSlice.actions;
export default userSlice.reducer;