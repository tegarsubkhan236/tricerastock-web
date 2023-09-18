import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/axios";

export const fetchProductCategory = createAsyncThunk(
    'productCategory/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/v1/master/product_category', {
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
    async ({parent_id, name}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/master/product_category', {
                parent_id, name
            });
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const updateProductCategory = createAsyncThunk(
    'productCategory/update',
    async ({id, name}, thunkAPI) => {
        try {
            const response = await instance.put(`/v1/master/product_category/${id}`, {
                name
            });
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
            await instance.delete(`/v1/master/product_category/${id}`, id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const msInvProductCategory = createSlice({
    name: 'product_categories',
    initialState: {
        productCategoryData: [],
        productCategoryTotalData: 0,
        productCategoryModalVisible: false,
        productCategoryModalType: '',
        productCategorySelectedRow: [],
        productCategoryStatus: 'idle',
        productCategoryCurrentPage: 1,
        productCategoryPerPage: 5
    },
    reducers: {
        setProductCategoryPerPage: (state, action) => {
            state.productCategoryStatus = 'idle';
            state.productCategoryPerPage = action.payload;
        },
        setProductCategoryCurrentPage: (state, action) => {
            state.productCategoryStatus = 'idle';
            state.productCategoryCurrentPage = action.payload;
        },
        setProductCategoryModalVisible: (state, action) => {
            state.productCategoryModalVisible = action.payload
        },
        setProductCategoryModalType: (state, action) => {
            state.productCategoryModalType = action.payload
        },
        setProductCategorySelectedRow: (state, action) => {
            state.productCategorySelectedRow = action.payload
        },
    },
    extraReducers: {
            [fetchProductCategory.pending]: (state) => {
                state.productCategoryStatus = 'loading';
            },
            [fetchProductCategory.fulfilled]: (state, action) => {
                state.productCategoryStatus = 'succeeded';
                state.productCategoryTotalData = action.payload.data.total;
                state.productCategoryData = action.payload.data.results.map((item) => ({
                    key: item.id,
                    value: item.id,
                    id: item.id,
                    name: item.name,
                    parent_id: item.parent_id,
                    title: item.name,
                    children: item.children?.length && item.children?.map((firstChild) => ({
                        key: firstChild.id,
                        value: firstChild.id,
                        id: firstChild.id,
                        name: firstChild.name,
                        parent_id: firstChild.parent_id,
                        title: firstChild.name,
                        children: firstChild.children?.length && firstChild.children?.map((secondChild) => ({
                            key: secondChild.id,
                            value: secondChild.id,
                            id: secondChild.id,
                            name: secondChild.name,
                            parent_id: secondChild.parent_id,
                            title: secondChild.name,
                        })),
                    })),
                }));
            },
            [postProductCategory.pending]: (state) => {
                state.productCategoryStatus = 'loading';
            },
            [postProductCategory.fulfilled]: (state) => {
                state.productCategoryStatus = 'idle';
            },
            [updateProductCategory.pending]: (state) => {
                state.productCategoryStatus = 'loading';
            },
            [updateProductCategory.fulfilled]: (state) => {
                state.productCategoryStatus = 'idle';
            },
    },
});

export const {
    setProductCategoryCurrentPage,
    setProductCategoryPerPage,
    setProductCategoryModalVisible,
    setProductCategoryModalType,
    setProductCategorySelectedRow,
} = msInvProductCategory.actions;

export default msInvProductCategory.reducer;