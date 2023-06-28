import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchSupplier = createAsyncThunk(
    'supplier/fetch',
    async ({page, perPage, column}, thunkAPI) => {
        try {
            let filter = {}
            let ids = {}
            if ("ids" in column){
                ids =  column.ids.map(value => `${value}`).join(',');
            }
            if ("name" in column){
                filter = {...filter, "supplier.name": column.name}
            }
            if ("address" in column){
                filter = {...filter, "supplier.address": column.address}
            }
            if ("contact_person" in column){
                filter = {...filter, "supplier.contact_person": column.contact_person}
            }
            if ("contact_number" in column){
                filter = {...filter, "supplier.contact_number": column.contact_number}
            }
            const response = await instance.get('/supplier', {
                params: {
                    page: page, 
                    limit: perPage,
                    ids: ids,
                    ...filter
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const fetchTemplateSupplier = createAsyncThunk(
    'supplier/fetch_template',
    async ({ids}, thunkAPI) => {
        try {
            const response = await instance.get('/supplier', {
                params: {
                    page: 1,
                    limit: 999,
                    ids: ids.map(value => `${value}`).join(','),
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const fetchDetailSupplier = createAsyncThunk(
    'supplier/detail',
    async ({id}, thunkAPI) => {
        try {
            const response = await instance.get(`/supplier/${id}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const postSupplier = createAsyncThunk(
    'supplier/post',
    async ({postData}, thunkAPI) => {
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
            const queryString = id.map((itemId) => `id=${itemId}`).join('&');
            await instance.delete(`/supplier?${queryString}`);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const msInvSupplier = createSlice({
    name: 'suppliers',
    initialState: {
        supplierData: [],
        supplierTotalData: 0,
        supplierSelectedRow: [],
        supplierFilter: {},
        supplierModalVisible: false,
        supplierModalType: '',
        supplierStatus: 'idle',
        supplierCurrentPage: 1,
        supplierPerPage: 5
    },
    reducers: {
        setSupplierStatus: (state, action) => {
            state.supplierStatus = action.payload
        },
        setSupplierPerPage: (state, action) => {
            state.supplierStatus = "idle"
            state.supplierPerPage = action.payload;
        },
        setSupplierCurrentPage: (state, action) => {
            state.supplierStatus = "idle"
            state.supplierCurrentPage = action.payload;
        },
        setSupplierFilter: (state, action) => {
            state.supplierStatus = "idle"
            state.supplierFilter = action.payload
        },
        setSupplierModalVisible: (state, action) => {
            state.supplierModalVisible = action.payload
        },
        setSupplierModalType: (state, action) => {
            state.supplierModalType = action.payload
        },
        setSupplierSelectedRow: (state, action) => {
            state.supplierSelectedRow = action.payload
        },
    },
    extraReducers: {
            [fetchSupplier.pending]: (state) => {
                state.supplierStatus = 'loading';
            },
            [fetchSupplier.fulfilled]: (state, action) => {
                state.supplierStatus = 'succeeded';
                state.supplierData = action.payload.data.results.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    contact_person: item.contact_person,
                    contact_number: item.contact_number,
                    status: item.status,
                }));
                state.supplierTotalData = action.payload.data.total;
            },
            [fetchSupplier.rejected]: (state) => {
                state.supplierStatus = 'failed';
            },

            [postSupplier.pending]: (state) => {
                state.supplierStatus = 'loading';
            },
            [postSupplier.fulfilled]: (state, action) => {
                state.supplierStatus = 'succeeded';
                const item = action.payload.data
                if (item !== null) {
                    const newItem = {
                        key: item.id,
                        id: item.id,
                        name: item.name,
                        address: item.address,
                        contact_person: item.contact_person,
                        contact_number: item.contact_number,
                        status: item.status,
                    }
                    state.supplierData.unshift(newItem)
                    state.supplierTotalData++
                }
            },
            [postSupplier.rejected]: (state) => {
                state.supplierStatus = 'failed';
            },
        
            [updateSupplier.pending]: (state) => {
                state.supplierStatus = 'loading';
            },
            [updateSupplier.fulfilled]: (state, action) => {
                state.supplierStatus = 'succeeded';
                const item = action.payload.data.item;
                const updatedItem = {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    contact_person: item.contact_person,
                    contact_number: item.contact_number,
                    status: item.status,
                }
                const index = state.supplierData.findIndex(item => item.id === updatedItem.id);
                state.supplierData[index] = updatedItem;
            },
            [updateSupplier.rejected]: (state) => {
                state.supplierStatus = 'failed';
            },
        
            [deleteSupplier.pending]: (state) => {
                state.supplierStatus = 'loading';
            },
            [deleteSupplier.fulfilled]: (state) => {
                state.supplierStatus = 'idle';
                state.supplierSelectedRow = [];
            },
            [deleteSupplier.rejected]: (state) => {
                state.supplierStatus = 'failed';
            },
    },
});

export const {
    setSupplierStatus,
    setSupplierPerPage,
    setSupplierCurrentPage,
    setSupplierFilter,
    setSupplierModalVisible,
    setSupplierModalType,
    setSupplierSelectedRow
} = msInvSupplier.actions;

export default msInvSupplier.reducer;