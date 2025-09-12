import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchApplications, fetchApplicationsWithApplicant } from '../api/functions.js';

export const getApplications = createAsyncThunk(
    'applications/getApplications',
    async (jobDetails, { rejectWithValue }) => {
        try {
            console.log('🟢 Redux: getApplications called for job:', jobDetails?.id);
            console.log('🟢 Redux: This will now use the OPTIMIZED filtered endpoint');
            
            const applications = await fetchApplications(jobDetails);
            
            console.log('🟢 Redux: Successfully got', applications?.length, 'applications');
            return applications;
        } catch (err) {
            console.error('🔴 Redux: getApplications error:', err);
            return rejectWithValue(err.message);
        }
    }
);

// Alternative thunk using the with-applicant endpoint
export const getApplicationsWithApplicant = createAsyncThunk(
    'applications/getApplicationsWithApplicant',
    async (jobDetails, { rejectWithValue }) => {
        try {
            console.log('🟢 Redux: getApplicationsWithApplicant called for job:', jobDetails?.id);
            
            const applications = await fetchApplicationsWithApplicant(jobDetails);
            
            console.log('🟢 Redux: Successfully got', applications?.length, 'applications with applicant data');
            return applications;
        } catch (err) {
            console.error('🔴 Redux: getApplicationsWithApplicant error:', err);
            return rejectWithValue(err.message);
        }
    }
);

// Enhanced thunk for custom filtered applications
export const getFilteredApplications = createAsyncThunk(
    'applications/getFilteredApplications',
    async ({ jobId, filterOptions = {} }, { rejectWithValue }) => {
        try {
            console.log('🟢 Redux: getFilteredApplications called for job:', jobId);
            console.log('🟢 Redux: Filter options:', filterOptions);
            
            const params = {
                jobId: jobId,
                filterType: filterOptions.filterType || 'all',
                locationThreshold: filterOptions.locationThreshold || 1000,
                percentageThreshold: filterOptions.percentageThreshold || 0,
                search: filterOptions.search || '',
                sortBy: filterOptions.sortBy || 'percentage',
                limit: filterOptions.limit || 100
            };

            const response = await axios.get(`http://localhost:8080/api/applications/filtered`, { params });
            console.log('🟢 Redux: Got', response.data?.length, 'filtered applications');
            return response.data;
        } catch (err) {
            console.error('🔴 Redux: getFilteredApplications error:', err);
            return rejectWithValue(err.message);
        }
    }
);

// Thunk to update application status
export const updateApplicationStatus = createAsyncThunk(
    'applications/updateStatus',
    async ({ applicationId, status, jobDetails }, { dispatch, rejectWithValue }) => {
        try {
            console.log('🟢 Redux: Updating application status:', applicationId, 'to', status);
            
            await axios.put(`http://localhost:8080/api/applications/${applicationId}/status`, null, {
                params: { status }
            });
            
            console.log('🟢 Redux: Status updated, refreshing applications with optimized endpoint...');
            // This will now use the optimized endpoint since fetchApplications was updated
            dispatch(getApplications(jobDetails));
            
        } catch (err) {
            console.error('🔴 Redux: updateApplicationStatus error:', err);
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
    reducers: {
        clearApplications: (state) => {
            state.list = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // getApplications (now uses optimized endpoint)
            .addCase(getApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('🟡 Redux: Loading applications...');
            })
            .addCase(getApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                console.log('🟢 Redux: Applications loaded into state:', action.payload?.length, 'items');
            })
            .addCase(getApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('🔴 Redux: Applications loading failed:', action.payload);
            })
            
            // getApplicationsWithApplicant
            .addCase(getApplicationsWithApplicant.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('🟡 Redux: Loading applications with applicant data...');
            })
            .addCase(getApplicationsWithApplicant.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                console.log('🟢 Redux: Applications with applicant data loaded:', action.payload?.length, 'items');
            })
            .addCase(getApplicationsWithApplicant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('🔴 Redux: Applications with applicant data loading failed:', action.payload);
            })
            
            // getFilteredApplications
            .addCase(getFilteredApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('🟡 Redux: Loading filtered applications...');
            })
            .addCase(getFilteredApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                console.log('🟢 Redux: Filtered applications loaded:', action.payload?.length, 'items');
            })
            .addCase(getFilteredApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('🔴 Redux: Filtered applications loading failed:', action.payload);
            })
            
            // updateApplicationStatus
            .addCase(updateApplicationStatus.pending, (state) => {
                state.loading = true;
                console.log('🟡 Redux: Updating application status...');
            })
            .addCase(updateApplicationStatus.fulfilled, (state) => {
                state.loading = false;
                console.log('🟢 Redux: Application status updated successfully');
            })
            .addCase(updateApplicationStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('🔴 Redux: Application status update failed:', action.payload);
            });
    }
});

export const { clearApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;