import { createSlice } from '@reduxjs/toolkit';

const percentagesSlice = createSlice({
    name: 'percentages',
    initialState: {
        matchPercentages: {},
        matchErrors: {}
    },
    reducers: {
        setMatchPercentage: (state, action) => {
            const { applicationId, percentage } = action.payload;
            state.matchPercentages[applicationId] = percentage;
        },
        setMatchError: (state, action) => {
            const { applicationId, error } = action.payload;
            state.matchErrors[applicationId] = error;
        }
    }
});

export const { setMatchPercentage, setMatchError } = percentagesSlice.actions;
export default percentagesSlice.reducer;
