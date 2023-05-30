import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchProduct = createAsyncThunk(
    'Product/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/product', {
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

export const postProduct = createAsyncThunk(
    'Product/post',
    async (postData, thunkAPI) => {
        try {
            return await instance.post('/product', postData)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'Product/update',
    async ({id, updatedData}, thunkAPI) => {
        try {
            const response = await instance.put(`/product/${id}`, updatedData);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'Product/delete',
    async ({id}, thunkAPI) => {
        try {
            await instance.delete(`/product/${id}`, id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const msInvProduct = createSlice({
    name: 'products',
    initialState: {
        data: [],
        filter: {
            suppliers : null,
            categories : null,
            search_text : null
        },
        modalVisible: false,
        modalType: '',
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
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setModalVisible: (state, action) => {
            state.modalVisible = action.payload
        },
        setModalType: (state, action) => {
            state.modalType = action.payload
        },
    },
    extraReducers: {
        [fetchProduct.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.data.results;
        },
        [postProduct.pending]: (state) => {
            state.status = 'loading';
        },
        [postProduct.fulfilled]: (state) => {
            state.status = 'succeeded';
        },
        [postProduct.rejected]: (state) => {
            state.status = 'failed';
        },
        [updateProduct.pending]: (state) => {
            state.status = 'loading';
        },
    },
});

export const {setCurrentPage, setPerPage, setFilter, setModalType, setModalVisible} = msInvProduct.actions;

export default msInvProduct.reducer;