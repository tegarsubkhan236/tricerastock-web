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
        modalVisible: false,
        modalType: '',
        status: 'idle',
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
        setModalVisible: (state, action) => {
            state.modalVisible = action.payload
        },
        setModalType: (state, action) => {
            state.modalType = action.payload
        },
    },
    extraReducers: {
            [fetchSupplier.pending]: (state) => {
                state.status = 'loading';
            },
            [fetchSupplier.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            },
            [fetchSupplier.rejected]: (state) => {
                state.status = 'failed';
            },
            [fetchSupplierByColumn.pending]: (state) => {
                state.status = 'loading';
            },
            [fetchSupplierByColumn.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            },
            [fetchSupplierByColumn.rejected]: (state) => {
                state.status = 'failed';
            },
            [postSupplier.pending]: (state) => {
                state.status = 'loading';
            },
            [postSupplier.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.data["data"]["results"].unshift(action.payload.data)
            },
            [postSupplier.rejected]: (state) => {
                state.status = 'failed';
            },
            [updateSupplier.pending]: (state) => {
                state.status = 'loading';
            },
            [updateSupplier.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                const updatedItem = action.payload.data.item;
                const index = state.data["data"]["results"].findIndex(item => item.id === updatedItem.id);
                state.data["data"]["results"][index] = updatedItem;
            },
            [updateSupplier.rejected]: (state) => {
                state.status = 'failed';
            },
            [deleteSupplier.pending]: (state) => {
                state.status = 'loading';
            },
            [deleteSupplier.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.data = state.data["data"]["results"].filter(user => user.id !== action.payload);
            },
            [deleteSupplier.rejected]: (state) => {
                state.status = 'failed';
            },
    },
});

export const {setCurrentPage, setPerPage, setModalVisible, setModalType} = msInvSupplier.actions;

export default msInvSupplier.reducer;