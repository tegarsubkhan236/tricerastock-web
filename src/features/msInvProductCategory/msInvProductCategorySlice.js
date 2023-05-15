import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchProductCategory = createAsyncThunk(
    'productCategory/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/product_category', {
                params: {
                    page: page,
                    limit: perPage,
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const postProductCategory = createAsyncThunk(
    'productCategory/post',
    async (postData, thunkAPI) => {
        try {
            const response = await instance.post('/product_category', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const updateProductCategory = createAsyncThunk(
    'productCategory/update',
    async ({id, updatedData}, thunkAPI) => {
        try {
            const response = await instance.put(`/product_category/${id}`, updatedData);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const deleteProductCategory = createAsyncThunk(
    'productCategory/delete',
    async ({id}, thunkAPI) => {
        try {
            await instance.delete(`/product_category/${id}`, id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const msInvProductCategory = createSlice({
    name: 'product_categories',
    initialState: {
        data: [],
        status: 'idle',
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
    extraReducers: {
            [fetchProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
            [fetchProductCategory.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data.results;
            },
            [postProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
            [updateProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
    },
});

export const {setCurrentPage, setPerPage} = msInvProductCategory.actions;

export default msInvProductCategory.reducer;