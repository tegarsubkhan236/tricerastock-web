import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchSupplier = createAsyncThunk(
    'supplier/fetch',
    async ({page, perPage}) => {
        const response = await instance.get('/supplier', {
            params: {
                page: page,
                limit: perPage,
            }
        });
        return response.data;
    }
);

export const postSupplier = createAsyncThunk(
    'supplier/post',
    async (postData) => {
        const response = await instance.post('/supplier', postData);
        return response.data
    }
)

export const updateSupplier = createAsyncThunk(
    'supplier/update',
    async ({id, updatedData}) => {
        const response = await instance.put(`/supplier/${id}`, updatedData);
        return response.data;
    }
);

export const deleteSupplier = createAsyncThunk(
    'supplier/delete',
    async ({id}) => {
        await instance.delete(`/supplier/${id}`, id);
        return id;
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(postSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                console.log("POST DATA", action)
                state.data["data"]["results"].unshift(action.payload.data)
            })
            .addCase(postSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                console.log("UPDATE DATA", action)
                const updatedItem = action.payload.data.item;
                const index = state.data["data"]["results"].findIndex(item => item.id === updatedItem.id);
                state.data["data"]["results"][index] = updatedItem;
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteSupplier.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = state.data["data"]["results"].filter(user => user.id !== action.payload);
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const {setCurrentPage, setPerPage} = msInvSupplier.actions;

export default msInvSupplier.reducer;