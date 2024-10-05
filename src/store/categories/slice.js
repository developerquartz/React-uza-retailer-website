import { createSlice } from '@reduxjs/toolkit'
import { apiGetCategories, apiGetSourceByApplication, apiGetTopCategories } from './actions'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
    },
    topCategories: {
        isLoading: false,
        data: [],
    },
    sourceByApplication: {
        isLoading: false,
        data: [],
    },
}

export const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Get categories
        builder.addCase(apiGetCategories.fulfilled, (state, action) => {
            state.categories.isLoading = false;
            state.categories.data = action.payload;
        }).addCase(apiGetCategories.pending, (state, action) => {
            state.categories.isLoading = true;
        }).addCase(apiGetCategories.rejected, (state, action) => {
            state.categories.isLoading = false;
        });


        // Get top categories
        builder.addCase(apiGetTopCategories.fulfilled, (state, action) => {
            state.topCategories.isLoading = false;
            state.topCategories.data = action.payload;
        }).addCase(apiGetTopCategories.pending, (state, action) => {
            state.topCategories.isLoading = true;
        }).addCase(apiGetTopCategories.rejected, (state, action) => {
            state.topCategories.isLoading = false;
        });


        // Get source by application
        builder.addCase(apiGetSourceByApplication.fulfilled, (state, action) => {
            state.sourceByApplication.isLoading = false;
            state.sourceByApplication.data = action.payload;
        }).addCase(apiGetSourceByApplication.pending, (state, action) => {
            state.sourceByApplication.isLoading = true;
        }).addCase(apiGetSourceByApplication.rejected, (state, action) => {
            state.sourceByApplication.isLoading = false;
        });
    },
})

// export const { } = slice.actions

export default slice.reducer