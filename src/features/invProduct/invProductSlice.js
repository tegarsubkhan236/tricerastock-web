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
        productData: [],
        productTotalData: 0,
        productFilter: {
            suppliers : null,
            categories : null,
            search_text : null
        },
        productModalVisible: false,
        productNodalType: '',
        productSelectedRow: [],
        productStatus: 'idle',
        productCurrentPage: 1,
        productPerPage: 5
    },
    reducers: {
        setProductStatus: (state, action) => {
            state.productStatus = action.payload
        },
        setProductPerPage: (state, action) => {
            state.productStatus = "idle"
            state.productPerPage = action.payload;
        },
        setProductCurrentPage: (state, action) => {
            state.productStatus = "idle"
            state.productCurrentPage = action.payload;
        },
        setProductFilter: (state, action) => {
            state.productStatus = "idle"
            state.productFilter = action.payload
        },
        setProductModalVisible: (state, action) => {
            state.productModalVisible = action.payload
        },
        setProductModalType: (state, action) => {
            state.productModalType = action.payload
        },
        setProductSelectedRow: (state, action) => {
            state.productSelectedRow = action.payload
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.productStatus = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.productStatus = 'succeeded';
            state.productData = action.payload.data.results.map((item) => ({
                key: item.id,
                id: item.id,
                name: item.name,
                cost: item.cost,
                supplier: item.inv_supplier,
                categories: item.inv_product_category,
            }));
            state.productTotalData = action.payload.data.total;
        },
        [fetchProducts.rejected]: (state) => {
            state.productStatus = 'failed';
        },

        [postProduct.pending]: (state) => {
            state.productStatus = 'loading';
        },
        [postProduct.fulfilled]: (state, action) => {
            state.productStatus = 'succeeded';
            if ("name" in action.payload.data.data) {
                const item = action.payload.data.data
                const newItem = {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    cost: item.cost,
                    supplier: item.inv_supplier,
                    categories: item.inv_product_category,
                }
                state.productData.unshift(newItem)
                state.productTotalData++
            }
        },
        [postProduct.rejected]: (state) => {
            state.productStatus = 'failed';
        },

        [updateProduct.pending]: (state) => {
            state.productStatus = 'loading';
        },

        [deleteProduct.pending]: (state) => {
            state.productStatus = 'loading';
        },
        [deleteProduct.fulfilled]: (state) => {
            state.productStatus = 'idle';
            state.productSelectedRow = [];
        },
        [deleteProduct.rejected]: (state) => {
            state.productStatus = 'failed';
        },
    },
});

export const {
    setProductStatus,
    setProductCurrentPage,
    setProductPerPage,
    setProductFilter,
    setProductModalType,
    setProductModalVisible,
    setProductSelectedRow
} = msInvProduct.actions;

export default msInvProduct.reducer;