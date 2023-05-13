import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchProductCategory = createAsyncThunk(
    'productCategory/fetch',
    async ({page, perPage}) => {
        const response = await instance.get('/product_category', {
            params: {
                page: page,
                limit: perPage,
            }
        });
        return response.data;
    }
);

export const postProductCategory = createAsyncThunk(
    'productCategory/post',
    async (postData) => {
        const response = await instance.post('/product_category', postData);
        return response.data
    }
)

export const updateProductCategory = createAsyncThunk(
    'productCategory/update',
    async ({id, updatedData}) => {
        const response = await instance.put(`/product_category/${id}`, updatedData);
        return response.data;
    }
);

export const deleteProductCategory = createAsyncThunk(
    'productCategory/delete',
    async ({id}) => {
        await instance.delete(`/product_category/${id}`, id);
        return id;
    }
);

const msInvProductCategory = createSlice({
    name: 'product_categories',
    initialState: {
        data: [],
        total: 0,
        status: 'idle',
        error: null,
        currentPage: 1,
        perPage: 5
    },
    reducers: {
        setPerPage: (state, action) => {
            state.status = 'idle';
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.status = 'idle';
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProductCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.data = action.payload.data.results;
                state.total = action.payload.data.total;
            })
            .addCase(fetchProductCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postProductCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postProductCategory.fulfilled, (state) => {
                state.status = 'idle';
                state.error = null;
            })
            .addCase(postProductCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProductCategory.fulfilled, (state) => {
                state.status = 'idle';
                state.error = null;
            })
            .addCase(updateProductCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProductCategory.fulfilled, (state) => {
                state.status = 'idle';
                state.error = null;
            })
            .addCase(deleteProductCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const {setCurrentPage, setPerPage} = msInvProductCategory.actions;

export default msInvProductCategory.reducer;