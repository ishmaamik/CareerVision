import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchApplications } from '../api/functions.js';

export const getApplications = createAsyncThunk(
    'applications/getApplications',
    async (jobDetails, { rejectWithValue }) => {
        try {
            const applications = await fetchApplications(jobDetails);
            return applications;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


// Thunk to update application status
export const updateApplicationStatus = createAsyncThunk(
    'applications/updateStatus',
    async ({ applicationId, status, jobDetails }, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(`http://localhost:8080/api/applications/${applicationId}/status`, null, {
                params: { status }
            });
            dispatch(getApplications(jobDetails)); // Refresh data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const applicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default applicationsSlice.reducer;
