import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchSupplier = createAsyncThunk(
    'supplier/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/supplier', {
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

export const fetchSupplierByColumn = createAsyncThunk(
    'supplier/fetch_by_name',
    async ({page, perPage, column}, thunkAPI) => {
        try {
            const response = await instance.post('/supplier/search/',column, {
                params: {
                    page: page,
                    limit: perPage,
                },
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const postSupplier = createAsyncThunk(
    'supplier/post',
    async (postData, thunkAPI) => {
        try {
            const response = await instance.post('/supplier', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const updateSupplier = createAsyncThunk(
    'supplier/update',
    async ({id, updatedData}, thunkAPI) => {
        try {
            const response = await instance.put(`/supplier/${id}`, updatedData);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const deleteSupplier = createAsyncThunk(
    'supplier/delete',
    async ({id}, thunkAPI) => {
        try {
            await instance.delete(`/supplier/${id}`, id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const msInvSupplier = createSlice({
    name: 'suppliers',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        perPage: 5
    },
    reducers: {
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: {
            [fetchSupplier.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [fetchSupplier.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            },
            [fetchSupplier.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
            [fetchSupplierByColumn.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [fetchSupplierByColumn.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            },
            [fetchSupplierByColumn.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
            [postSupplier.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [postSupplier.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data["data"]["results"].unshift(action.payload.data)
            },
            [postSupplier.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
            [updateSupplier.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [updateSupplier.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                const updatedItem = action.payload.data.item;
                const index = state.data["data"]["results"].findIndex(item => item.id === updatedItem.id);
                state.data["data"]["results"][index] = updatedItem;
            },
            [updateSupplier.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
            [deleteSupplier.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [deleteSupplier.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = state.data["data"]["results"].filter(user => user.id !== action.payload);
            },
            [deleteSupplier.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
    },
});

export const {setCurrentPage, setPerPage} = msInvSupplier.actions;

export default msInvSupplier.reducer;