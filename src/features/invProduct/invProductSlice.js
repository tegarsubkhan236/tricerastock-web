import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchProducts = createAsyncThunk(
    'Product/fetch',
    async ({page, perPage, supplier_id, category_id, search_text}, thunkAPI) => {
        try {
            const response = await instance.get('/product', {
                params: {
                    page: page,
                    limit: perPage,
                    supplier_id: supplier_id,
                    product_category: category_id,
                    search_text: search_text,
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const postProduct = createAsyncThunk(
    'Product/post',
    async (postData, thunkAPI) => {
        try {
            return await instance.post('/product', postData)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
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
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'Product/delete',
    async ({id}, thunkAPI) => {
        try {
            const queryString = id.map((itemId) => `id=${itemId}`).join('&');
            await instance.delete(`/product?${queryString}`);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const msInvProduct = createSlice({
    name: 'products',
    initialState: {
        data: [],
        totalData: 0,
        filter: {
            suppliers : null,
            categories : null,
            search_text : null
        },
        modalVisible: false,
        modalType: '',
        selectedRow: [],
        status: 'idle',
        currentPage: 1,
        perPage: 5
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setPerPage: (state, action) => {
            state.status = "idle"
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.status = "idle"
            state.currentPage = action.payload;
        },
        setFilter: (state, action) => {
            state.status = "idle"
            state.filter = action.payload
        },
        setModalVisible: (state, action) => {
            state.modalVisible = action.payload
        },
        setModalType: (state, action) => {
            state.modalType = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.data.results.map((item) => ({
                key: item.id,
                id: item.id,
                name: item.name,
                supplier: item.inv_supplier,
                categories: item.inv_product_category,
            }));
            state.totalData = action.payload.data.total;
        },
        [fetchProducts.rejected]: (state) => {
            state.status = 'failed';
        },

        [postProduct.pending]: (state) => {
            state.status = 'loading';
        },
        [postProduct.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            if (action.payload.data.data.length === 1) {
                const item = action.payload.data.data
                const newItem = {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    supplier: item.inv_supplier,
                    categories: item.inv_product_category,
                }
                state.data.unshift(newItem)
                state.totalData++
            }
        },
        [postProduct.rejected]: (state) => {
            state.status = 'failed';
        },

        [updateProduct.pending]: (state) => {
            state.status = 'loading';
        },

        [deleteProduct.fulfilled]: (state) => {
            state.status = 'succeeded';
        },
        [deleteProduct.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteProduct.rejected]: (state) => {
            state.status = 'failed';
        },
    },
});

export const {setStatus, setCurrentPage, setPerPage, setFilter, setModalType, setModalVisible, setSelectedRow} = msInvProduct.actions;

export default msInvProduct.reducer;